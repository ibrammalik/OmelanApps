const { badRequest } = require('@hapi/boom');
const template = require('../../utils/notificationTemplate');

class AppointmentHandler {
  constructor(notificationPartnerService, notificationClientService, usersPartnerService, usersClientService, schedulesService, reviewService, service, validator) {
    this._notificationPartnerService = notificationPartnerService;
    this._notificationClientService = notificationClientService;
    this._usersPartnerService = usersPartnerService;
    this._usersClientService = usersClientService;
    this._schedulesService = schedulesService;
    this._reviewService = reviewService;
    this._service = service;
    this._validator = validator;
  }

  postAppointmentHandler = async (request, h) => {
    this._validator.validateAppointmentPayload(request.payload);

    const { userPartnerId, scheduleId, duration } = request.payload;
    const { id: userClientId } = request.auth.credentials;

    const scheduleHasBeenTaken = await this._service.validateBookingDate(scheduleId);
    const dataSchedule = await this._schedulesService.getScheduleById(scheduleId);
    const dataClient = await this._usersClientService.getUserDetailsById(userClientId);

    if (!scheduleHasBeenTaken) {
      const ratePerHour = await this._usersPartnerService.getUserPartnerRate(userPartnerId);
      const costEstimation = ratePerHour * duration;

      const appointmentId = await this._service.createAppointment({ userClientId, userPartnerId, scheduleId, duration, costEstimation });
      if (appointmentId) {
        const { subject, content } = template({ name: dataClient.fullname, date: dataSchedule.date }).createBookingNotificationForPartner;
        await this._notificationPartnerService.addNotification({ userPartnerId, subject, content });

        const response = h.response({
          status: 'success',
          message: 'Appointment created',
          data: { appointmentId },
        });
        response.code(201);
        return response;
      }
    }
  };

  getAppointmentsByPartnerHandler = async (request) => {
    const { id: partnerId } = request.auth.credentials;
    const appointments = await this._service.getAppointmentsForPartner(partnerId);

    return {
      status: 'success',
      data: { appointments },
    };
  };

  getAppointmentsByClientHandler = async (request) => {
    const { id: clientId } = request.auth.credentials;

    const appointments = await this._service.getAppointmentsForClient(clientId);
    return {
      status: 'success',
      data: { appointments },
    };
  };

  updateAppointmentStatusHandler = async (request, h) => {
    try {
      const { id } = request.params;
      const { status } = request.payload;

      if (status === 'completed') {
        const appointment = await this._service.getAppointmentByIdForReview(id);

        if (!appointment.user_client_id) {
          throw badRequest(
            'Failed create review: user client not found.'
          );
        }
        if (!appointment.user_partner_id) {
          throw badRequest(
            'Failed create review: user partner not found.'
          );
        }

        await this._reviewService.createReview({
          appointmentId: id,
          userClientId: appointment.user_client_id,
          userPartnerId: appointment.user_partner_id,
        });
      }

      await this._service.updateAppointmentStatus({ id, status });

      return {
        status: 'success',
        message: 'Appointment status updated successfully',
      };
    } catch (error) {

      return h
        .response({
          status: 'fail',
          message: 'Failed to update appointment status',
          error: error.message,
        })
        .code(500);
    }
  };
}

module.exports = AppointmentHandler;
