const { badRequest } = require('@hapi/boom');
const { UsersPartnerPayloadSchema, UsersPartnerUpdatePayloadSchema } = require('./schema');

const UsersPartnerValidator = {
  validateUserPartnerPayload: (payload) => {
    const validateResult = UsersPartnerPayloadSchema.validate(payload);
    if (validateResult.error) {
      throw badRequest(validateResult.error.message);
    }
  },
  validateUserPartnerUpdatePayload: (payload) => {
    const validateResult = UsersPartnerUpdatePayloadSchema.validate(payload);
    if (validateResult.error) {
      throw badRequest(validateResult.error.message);
    }
  }
};

module.exports = UsersPartnerValidator;