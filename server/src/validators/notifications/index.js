const { badRequest } = require('@hapi/boom');
const { NotificationsClientPayloadSchema, NotificationsPartnerPayloadSchema } = require('./schema');

const NotificationValidator = {
  validateNotificationClientPayload: (payload) => {
    const validationResult = NotificationsClientPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw badRequest(validationResult.error.message);
    }
  },
  validateNotificationPartnerPayload: (payload) => {
    const validationResult = NotificationsPartnerPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw badRequest(validationResult.error.message);
    }
  },
};

module.exports = NotificationValidator;
