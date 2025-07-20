class SchedulesHandler {
  constructor(usersClientService, usersPartnerService, schedulesService, validator) {
    this._usersClientService = usersClientService;
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

  getScheduleByDate = async (request) => {
    this._validator.validateSchedulePayload(request.payload);

    const { id: credentialId } = request.auth.credentials;
    await this._usersClientService.verifyUserExisting(credentialId);

    const partners = [];
    const partnersId = await this._schedulesService.getSchedulesByDate(request.payload);

    if (partnersId.length) {
      partnersId.forEach(async (partnerId) => {
        const data = new Promise((resolve, reject) => {
          this._usersPartnerService.getUserDetailsById(partnerId.user_id).then((result) => resolve(result)).catch((err) => reject(err));
        });
        partners.push(data);
      });

      return Promise.all(partners).then((result) => {
        return {
          status: 'success',
          data: {
            partners: result
          }
        };
      });
    }
  };
}

module.exports = SchedulesHandler;