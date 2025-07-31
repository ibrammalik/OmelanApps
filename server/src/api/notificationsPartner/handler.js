class SchedulesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  getAllSubjectNotificationsByUserId = async (request) => {
    const { id: credentialId } = request.auth.credentials;

    const notifications = await this._service.getAllSubjectNotificationsByUserId(credentialId);
    return {
      status: 'success',
      data: {
        notifications
      },
    };
  };

  getUnreadSubjectNotificationsByUserId = async (request) => {
    const { id: credentialId } = request.auth.credentials;

    const notifications = await this._service.getUnreadSubjectNotificationsByUserId(credentialId);
    return {
      status: 'success',
      data: {
        notifications
      },
    };
  };

  getContentNotificationById = async (request) => {
    const { id: userPartnerId } = request.auth.credentials;
    const { id } = request.params;

    const content = await this._service.getContentNotificationById({ id, userPartnerId });
    return {
      status: 'success',
      data: {
        content
      },
    };
  };

  putStatusRead = async (request) => {
    const { id: userPartnerId } = request.auth.credentials;
    const { statusRead } = request.payload;
    const { id } = request.params;

    await this._usersPartnerService.editStatusNotificationById({ id, userPartnerId, statusRead });

    await this._service.getAllSubjectNotificationsByUserId(userPartnerId);
    return {
      status: 'success',
      message: 'Status updated successfully',
    };
  };
}

module.exports = SchedulesHandler;
