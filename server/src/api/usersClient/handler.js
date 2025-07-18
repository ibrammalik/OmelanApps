class UsersClientHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  getUserClientDetailsById = async (request) => {
    const { id: credentialId } = request.auth.credentials;

    const details = await this._service.getUserDetailsById(credentialId);
    return {
      status: 'success',
      data: {
        details
      }
    };
  };

  postUsersClient = async (request, h) => {
    this._validator.validateUserClientPayload(request.payload);

    await this._service.verifyUserRegister(request.payload);

    const userId = await this._service.addUser(request.payload);
    const response = h.response({
      status: 'success',
      data: {
        userId
      }
    });
    response.code(201);
    return response;
  };

  putUserClientDetails = async (request) => {
    this._validator.validateUserClientUpdatePayload(request.payload);

    const { id: credentialId } = request.auth.credentials;

    await this._service.editUserById(credentialId, request.payload);
    return {
      status: 'success',
      message: 'Data updated successfully'
    };
  };
}

module.exports = UsersClientHandler;