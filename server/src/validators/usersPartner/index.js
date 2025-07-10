const { badRequest } = require('@hapi/boom');
const UsersPartnerSchema = require('./schema');

const UsersPartnerValidator = {
  validateUserPartnerPayload: (payload) => {
    const validateResult = UsersPartnerSchema.validate(payload);
    if (validateResult.error) {
      throw badRequest(validateResult.error.message);
    }
  }
};

module.exports = UsersPartnerValidator;