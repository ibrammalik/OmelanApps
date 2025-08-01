const { badRequest } = require("@hapi/boom");

class UploadsHandler {
  constructor(usersClientService, usersPartnerService, service, validator) {
    this._usersClientService = usersClientService;
    this._usersPartnerService = usersPartnerService;
    this._service = service;
    this._validator = validator;
  }

  postUploadImageHandler = async (request, h) => {
    try {
      const { photo } = request.payload;

      if (!photo || !photo.hapi || !photo.hapi.headers) {
        throw badRequest("Foto tidak valid atau rusak.");
      }

      // this._validator.validateImageHeaders(photo.hapi.headers);

      const { id: credentialId } = request.auth.credentials;

      const userClient = await this._usersClientService.getUserDetailsById(
        credentialId
      );
      const userPartner = await this._usersPartnerService.getUserDetailsById(
        credentialId
      );

      if (!userClient && !userPartner) {
        throw badRequest("Gagal upload foto: pengguna tidak ditemukan.");
      }

      const filelocation = await this._service.writeFile(photo, photo.hapi);

      if (userClient) {
        await this._usersClientService.addPhotoUrl(credentialId, filelocation);
      } else if (userPartner) {
        await this._usersPartnerService.addPhotoUrl(credentialId, filelocation);
      }

      const response = h.response({
        status: "success",
        message: "Photo uploaded successfully",
        url: filelocation,
      });

      response.code(201);

      return response;
    } catch (err) {
      throw err;
    }
  };
}

module.exports = UploadsHandler;
