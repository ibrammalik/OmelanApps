const { badRequest } = require('@hapi/boom');
const { SchedulePayloadSchema, ScheduleUploadPayloadSchema } = require('./schema');

const SchedulesValidator = {
  validateSchedulePayload: (payload) => {
    const validateResult = SchedulePayloadSchema.validate(payload);
    if (validateResult.error) {
      throw badRequest(validateResult.error.message);
    }
  },
  validateScheduleUpdatePayload: (payload) => {
    const validateResult = ScheduleUploadPayloadSchema.validate(payload);
    if (validateResult.error) {
      throw badRequest(validateResult.error.message);
    }
  }
};

module.exports = SchedulesValidator;