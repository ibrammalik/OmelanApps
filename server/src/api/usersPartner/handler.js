class UsersPartnerHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  postUsersPartner = async (request, h) => {
    this._validator.validateUserPartnerPayload(request.payload);

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

module.exports = UsersPartnerHandler;