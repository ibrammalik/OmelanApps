const Joi = require('joi');

const NotificationsClientPayloadSchema = Joi.object({
  userClientId: Joi.string().required(),
  subject: Joi.string().required(),
  content: Joi.string().required()
});

const NotificationsPartnerPayloadSchema = Joi.object({
  userClientId: Joi.string().required(),
  subject: Joi.string().required(),
  content: Joi.string().required()
});

module.exports = { NotificationsClientPayloadSchema, NotificationsPartnerPayloadSchema };
