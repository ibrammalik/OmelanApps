const { badRequest } = require('@hapi/boom');
const { UserLoginPayloadSchema, UserRefreshTokenPayloadSchema, UserLogoutPayloadSchema } = require('./schema');

const AuthenticationsValidator = {
  validateUserLoginPayload: (payload) => {
    const validateResult = UserLoginPayloadSchema.validate(payload);
    if (validateResult.error) {
      throw badRequest(validateResult.error.message);
    }
  },
  validateUserRefreshPayload: (payload) => {
    const validateResult = UserRefreshTokenPayloadSchema.validate(payload);
    if (validateResult.error) {
      throw badRequest(validateResult.error.message);
    }
  },
  validateUserLogoutPayload: (payload) => {
    const validateResult = UserLogoutPayloadSchema.validate(payload);
    if (validateResult.error) {
      throw badRequest(validateResult.error.message);
    }
  }
};

module.exports = AuthenticationsValidator;