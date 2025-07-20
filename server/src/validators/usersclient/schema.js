const Joi = require('joi');

const UsersClientPayloadSchema = Joi.object({
  username: Joi.string().required(),
  fullname: Joi.string().required(),
  password: Joi.string().required()
});

const UsersClientUpdatePayloadSchema = Joi.object({
  age: Joi.number().required(),
  fullname: Joi.string().required(),
  address: Joi.string().required(),
  biodata: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  partnerName: Joi.string().required(),
  emergencyContact: Joi.string().required(),
  photoUrl: Joi.string()
});

module.exports = { UsersClientPayloadSchema, UsersClientUpdatePayloadSchema };