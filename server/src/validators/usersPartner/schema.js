const Joi = require('joi');

const UsersPartnerPayloadSchema = Joi.object({
  username: Joi.string().required(),
  fullname: Joi.string().required(),
  password: Joi.string().required()
});

const UsersPartnerUpdatePayloadSchema = Joi.object({
  age: Joi.number().required(),
  fullname: Joi.string().required(),
  address: Joi.string().required(),
  biodata: Joi.string().required(),
  photoUrl: Joi.string()
});

module.exports = { UsersPartnerPayloadSchema, UsersPartnerUpdatePayloadSchema };