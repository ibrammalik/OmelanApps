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

  updateAppointmentStatusHandler = async (request, h) => {
    try {
      const { id } = request.params;
      const { status } = request.payload;

      await this._service.updateAppointmentStatus({ id, status });

      if (status === "completed") {
        const appointment = await this._service.getAppointmentByIdForReview(id);

        await this._reviewService.createReview({
          appointmentId: id,
          userClientId: appointment.user_client_id,
          userPartnerId: appointment.user_partner_id,
        });
      }

      return {
        status: "success",
        message: "Status appointment berhasil diperbarui",
      };
    } catch (error) {
      // console.error(" Gagal update appointment:", error.message);

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
