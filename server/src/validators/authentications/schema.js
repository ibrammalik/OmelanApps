const Joi = require('joi');

const UserLoginPayloadSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

const UserRefreshTokenPayloadSchema = Joi.object({
  refreshToken: Joi.string().required()
});

const UserLogoutPayloadSchema = Joi.object({
  refreshToken: Joi.string().required()
});

module.exports = { UserLoginPayloadSchema, UserRefreshTokenPayloadSchema, UserLogoutPayloadSchema };