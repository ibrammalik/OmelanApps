const { badRequest } = require('@hapi/boom');
const { AppointmentPayloadSchema } = require('./schema');

const AppointmentValidator = {
  validateAppointmentPayload: (payload) => {
    const validationResult = AppointmentPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw badRequest(validationResult.error.message);
    }
  },
};

module.exports = AppointmentValidator;
