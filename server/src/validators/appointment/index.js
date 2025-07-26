const { AppointmentPayloadSchema } = require("./schema");

const AppointmentValidator = {
  validateAppointmentPayload: (payload) => {
    const validationResult = AppointmentPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }
  },
};

module.exports = AppointmentValidator;
