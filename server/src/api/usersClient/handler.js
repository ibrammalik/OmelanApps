class UsersClientHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

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
}

module.exports = UsersClientHandler;