const { badRequest } = require('@hapi/boom');
const ImageHeaderSchema = require('./schema');

const UploadsValidator = {
  validateImageHeaders: (header) => {
    const validationResult = ImageHeaderSchema.validate(header);
    if (validationResult.error) {
      throw badRequest(validationResult.error.message);
    }
  }
};

module.exports = UploadsValidator;