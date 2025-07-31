const Joi = require('joi');

const ReviewPayloadSchema = Joi.object({
  appointmentId: Joi.number().required(),
  userClientId: Joi.string().required(),
  userPartnerId: Joi.string().required(),
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().allow('', null),
});

module.exports = { ReviewPayloadSchema };
