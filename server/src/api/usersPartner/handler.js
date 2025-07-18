class UsersPartnerHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  getUsersPartner = async (request) => {
    const list = await this._service.getUsers(request.payload);
    return {
      status: 'success',
      data: {
        list: list.rows,
        recordsLength: list.rowCount
      }
    };
  };

  getUserPartnerDetailsById = async (request) => {
    const { id } = request.params;

    const details = await this._service.getUserDetailsById(id);
    return {
      status: 'success',
      data: {
        details
      }
    };
  };

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

  putUserPartnerDetails = async (request) => {
    this._validator.validateUserPartnerUpdatePayload(request.payload);

    const { id: credentialId } = request.auth.credentials;

    await this._service.editUserById(credentialId, request.payload);
    return {
      status: 'success',
      message: 'Data updated successfully'
    };
  };
}

module.exports = UsersPartnerHandler;