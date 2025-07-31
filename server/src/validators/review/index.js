const { badRequest } = require('@hapi/boom');
const { ReviewPayloadSchema } = require('./schema');

const ReviewValidator = {
  validateReviewPayload: (payload) => {
    const validationResult = ReviewPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw badRequest(validationResult.error.message);
    }
  },
};

module.exports = ReviewValidator;
