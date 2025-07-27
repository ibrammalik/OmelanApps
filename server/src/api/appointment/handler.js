class AppointmentHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
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
    const { id } = request.params;
    const { status } = request.payload;

    await this._service.updateAppointmentStatus({ id, status });

    const response = h.response({
      status: "success",
      message: "Status appointment diperbarui",
    });

    response.code(200);
    return response;
  };
}

module.exports = AppointmentHandler;
