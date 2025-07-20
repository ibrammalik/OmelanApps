const Joi = require('joi');

const SchedulePayloadSchema = Joi.object({
  dateStart: Joi.date().required(),
  dateEnd: Joi.date().required()
});

const ScheduleUploadPayloadSchema = Joi.object({
  id: Joi.string().required(),
  dateStart: Joi.date().required(),
  dateEnd: Joi.date().required()
});

module.exports = { SchedulePayloadSchema, ScheduleUploadPayloadSchema };