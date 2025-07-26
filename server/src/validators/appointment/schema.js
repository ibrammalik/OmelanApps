const Joi = require("joi");

const AppointmentPayloadSchema = Joi.object({
  userPartnerId: Joi.string().required(),
  appointmentDate: Joi.date().required(),
});

module.exports = { AppointmentPayloadSchema };
