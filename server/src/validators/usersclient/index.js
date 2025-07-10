const { badRequest } = require('@hapi/boom');
const UsersClientSchema = require('./schema');

const UsersClientValidator = {
  validateUserClientPayload: (payload) => {
    const validateResult = UsersClientSchema.validate(payload);
    if (validateResult.error) {
      throw badRequest(validateResult.error.message);
    }
  }
};

module.exports = UsersClientValidator;