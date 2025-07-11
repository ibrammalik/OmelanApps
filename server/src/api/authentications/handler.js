class AuthenticationHandler {
  constructor(usersClientService, usersPartnerService, tokenManager, service, validator) {
    this._usersClientService = usersClientService;
    this._usersPartnerService = usersPartnerService;
    this._tokenManager = tokenManager;
    this._service = service;
    this._validator = validator ;
  }

  postAuthenticationUserClientHandler = async (request, h) => {
    this._validator.validateUserLoginPayload(request.payload);

    const { username, password } = request.payload;
    const id = await this._usersClientService.verifyUserCredential(username, password);

    const accessToken = await this._tokenManager.generateAccessToken({ id });
    const refreshToken = await this._tokenManager.generateRefreshToken({ id });

    await this._service.addRefreshToken(refreshToken);

    const response = h.response({
      status: 'success',
      message: 'User authenticated',
      data: {
        accessToken, refreshToken
      }
    });
    response.code(201);
    return response;
  };

  postAuthenticationUserPartnerHandler = async (request, h) => {
    this._validator.validateUserLoginPayload(request.payload);

    const { username, password } = request.payload;
    const id = await this._usersPartnerService.verifyUserCredential(username, password);

    const accessToken = await this._tokenManager.generateAccessToken({ id });
    const refreshToken = await this._tokenManager.generateRefreshToken({ id });

    await this._service.addRefreshToken(refreshToken);

    const response = h.response({
      status: 'success',
      message: 'User authenticated',
      data: {
        accessToken, refreshToken
      }
    });
    response.code(201);
    return response;
  };

  putAuthenticationHandler = async (request) => {
    this._validator.validateUserRefreshPayload(request.payload);

    const { refreshToken } = request.payload;
    await this._service.verifyRefreshTokenDB(refreshToken);
    const { id } = this._tokenManager.verifyRefreshTokenByJwt(refreshToken);

    const accessToken = this._tokenManager.generateAccessToken({ id });
    return {
      status: 'success',
      message: 'Token updated successfully',
      data: {
        accessToken
      }
    };
  };

  deleteAuthenticationHandler = async (request) => {
    this._validator.validateUserLogoutPayload(request.payload);

    const { refreshToken } = request.payload;
    await this._service.verifyRefreshTokenDB(refreshToken);
    await this._service.deleteRefreshToken(refreshToken);
    return {
      status: 'success',
      message: 'Token removed successfully'
    };
  };
}



module.exports = AuthenticationHandler;