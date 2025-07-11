const Joi = require('joi');

const UsersClientPayloadSchema = Joi.object({
  username: Joi.string().required(),
  fullname: Joi.string().required(),
  password: Joi.string().required()
});

module.exports = UsersClientPayloadSchema;