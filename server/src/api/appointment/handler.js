class AppointmentHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  postAppointmentHandler = async (request, h) => {
    try {
      console.log("📥 Payload Masuk:", request.payload);

      this._validator.validateAppointmentPayload(request.payload);
      console.log("✅ Payload valid menurut schema");

      const { userPartnerId, appointmentDate } = request.payload;
      const { id: userClientId } = request.auth.credentials;

      console.log("🧾 Final Data yang akan disimpan:", {
        userClientId,
        userPartnerId,
        appointmentDate,
      });

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
      console.error("❌ Error saat membuat appointment:", error.message);
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
}

module.exports = AppointmentHandler;
