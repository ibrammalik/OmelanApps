class SchedulesHandler {
  constructor(usersPartnerService, schedulesService, validator) {
    this._usersPartnerService = usersPartnerService;
    this._schedulesService = schedulesService;
    this._validator = validator;
  }

  getScheduleById = async (request) => {
    const { id: credentialId } = request.auth.credentials;

    const schedules = await this._schedulesService.getSchedulesById(credentialId);
    return {
      status: 'success',
      data: {
        schedules
      }
    };
  };

  postSchedule = async (request, h) => {
    this._validator.validateSchedulePayload(request.payload);

    const { id: credentialId } = request.auth.credentials;

    await this._usersPartnerService.verifyUserExisting(credentialId);

    const userId = await this._schedulesService.addSchedule(credentialId, request.payload);
    const response = h.response({
      status: 'success',
      data: {
        userId
      }
    });
    response.code(201);
    return response;
  };

  putSchedule = async (request) => {
    this._validator.validateScheduleUpdatePayload(request.payload);

    const { id: credentialId } = request.auth.credentials;

    await this._usersPartnerService.verifyUserExisting(credentialId);

    await this._schedulesService.editScheduleById(credentialId, request.payload);
    return {
      status: 'success',
      message: 'Schedule updated successfully'
    };
  };
}

module.exports = SchedulesHandler;