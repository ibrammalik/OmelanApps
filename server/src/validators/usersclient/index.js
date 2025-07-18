const { badRequest } = require('@hapi/boom');
const { UsersClientPayloadSchema, UsersClientUpdatePayloadSchema } = require('./schema');

const UsersClientValidator = {
  validateUserClientPayload: (payload) => {
    const validateResult = UsersClientPayloadSchema.validate(payload);
    if (validateResult.error) {
      throw badRequest(validateResult.error.message);
    }
  },
  validateUserClientUpdatePayload: (payload) => {
    const validateResult = UsersClientUpdatePayloadSchema.validate(payload);
    if (validateResult.error) {
      throw badRequest(validateResult.error.message);
    }
  }
};

module.exports = UsersClientValidator;