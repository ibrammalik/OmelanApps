const { badRequest } = require('@hapi/boom');

class AppointmentHandler {
  constructor(usersPartnerService, schedulesService, reviewService, service, validator) {
    this._usersPartnerService = usersPartnerService;
    this._schedulesService = schedulesService;
    this._reviewService = reviewService;
    this._service = service;
    this._validator = validator;
  }

  postAppointmentHandler = async (request, h) => {
    this._validator.validateAppointmentPayload(request.payload);

    const { userPartnerId, scheduleId, duration } = request.payload;
    const { id: userClientId } = request.auth.credentials;

    await this._schedulesService.getSchedulesById(scheduleId);

    const scheduleHasBeenTaken = await this._service.validateBookingDate(scheduleId);

    if (!scheduleHasBeenTaken) {
      const ratePerHour = await this._usersPartnerService.getUserPartnerRate(userPartnerId);
      const costEstimation = ratePerHour * duration;

      const appointmentId = await this._service.createAppointment({ userClientId, userPartnerId, scheduleId, duration, costEstimation });

      const response = h.response({
        status: 'success',
        message: 'Appointment created',
        data: { appointmentId },
      });
      response.code(201);
      return response;
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
