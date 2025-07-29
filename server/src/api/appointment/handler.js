const { badRequest, notFound } = require("@hapi/boom");

class AppointmentHandler {
  constructor(service, validator, reviewService) {
    this._service = service;
    this._validator = validator;
    this._reviewService = reviewService;
  }

  postAppointmentHandler = async (request, h) => {
    try {
      this._validator.validateAppointmentPayload(request.payload);

      const { userPartnerId, appointmentDate } = request.payload;
      const { id: userClientId } = request.auth.credentials;

      const appointmentId = await this._service.createAppointment({
        userClientId,
        userPartnerId,
        appointmentDate,
      });

      const response = h.response({
        status: "success",
        message: "Appointment created",
        data: { appointmentId },
      });
      response.code(201);
      return response;
    } catch (error) {
      return h
        .response({
          status: "fail",
          message: error.message,
        })
        .code(400);
    }
  };

  getAppointmentsByPartnerHandler = async (request) => {
    const { id: partnerId } = request.auth.credentials;
    const appointments = await this._service.getAppointmentsForPartner(
      partnerId
    );

    return {
      status: "success",
      data: { appointments },
    };
  };

  getAppointmentsByClientHandler = async (request) => {
    const { id: ClientId } = request.auth.credentials;
    const appointments = await this._service.getAppointmentsForClient(ClientId);

    return {
      status: "success",
      data: { appointments },
    };
  };

  updateAppointmentStatusHandler = async (request, h) => {
    try {
      const { id } = request.params;
      const { status } = request.payload;

      if (status === "completed") {
        const appointment = await this._service.getAppointmentByIdForReview(id);

        if (!appointment.user_client_id) {
          throw badRequest(
            "Gagal membuat review: user_client_id tidak ditemukan."
          );
        }
        if (!appointment.user_partner_id) {
          throw badRequest(
            "Gagal membuat review: user_partner_id tidak ditemukan."
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
        status: "success",
        message: "Status appointment berhasil diperbarui",
      };
    } catch (error) {
      // console.error("Handler Gagal update appointment:", error.message);

      return h
        .response({
          status: "fail",
          message: "Gagal memperbarui status appointment",
          error: error.message,
        })
        .code(500);
    }
  };
}

module.exports = AppointmentHandler;
