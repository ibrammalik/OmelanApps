const { badRequest } = require('@hapi/boom');

class UploadsHandler {
  constructor(usersClientService, usersPartnerService, service, validator) {
    this._usersClientService = usersClientService;
    this._usersPartnerService = usersPartnerService;
    this._service = service;
    this._validator = validator;
  }

  postUploadImageHandler = async (request, h) => {
    const { photo } = request.payload;

    const { id: credentialId } = request.auth.credentials;

    const userClient = await this._usersClientService.getUserDetailsById(credentialId);
    const userPartner = await this._usersPartnerService.getUserDetailsById(credentialId);

    if (!userClient && !userPartner) {
      throw badRequest('Failed upload photo: user not found.');
    }

    this._validator.validateImageHeaders(photo.hapi.headers);

    const filelocation = await this._service.writeFile(photo, photo.hapi);

    if (userClient) await this._usersClientService.addPhotoUrl(credentialId, `${filelocation}`);
    else if (userPartner) await this._usersPartnerService.addPhotoUrl(credentialId, `${filelocation}`);

    const response = h.response({
      status: 'success',
      message: 'Photo uploaded successfully'
    });
    response.code(201);
    return response;
  };
}

module.exports = UploadsHandler;