const InvariantError = require("../../exceptions/InvariantError");

const ReviewValidator = {
  validateReviewPayload: (payload) => {
    const validationResult = ReviewPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = ReviewValidator;
