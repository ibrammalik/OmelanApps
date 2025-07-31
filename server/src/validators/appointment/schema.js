const Joi = require('joi');

const AppointmentPayloadSchema = Joi.object({
  userPartnerId: Joi.string().required(),
  scheduleId: Joi.string().required(),
  duration: Joi.number().required(),
});

module.exports = { AppointmentPayloadSchema };
