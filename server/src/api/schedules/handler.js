class SchedulesHandler {
  constructor(usersClientService, usersPartnerService, schedulesService, validator) {
    this._usersClientService = usersClientService;
    this._usersPartnerService = usersPartnerService;
    this._schedulesService = schedulesService;
    this._validator = validator;
  }

  getScheduleByUserId = async (request) => {
    const { id: credentialId } = request.auth.credentials;

    const schedules = await this._schedulesService.getSchedulesByUserId(credentialId);
    return {
      status: 'success',
      data: {
        schedules,
      },
    };
  };

  getScheduleById = async (request) => {
    const schedules = await this._schedulesService.getSchedulesById(request.payload);
    return {
      status: 'success',
      data: {
        schedules,
      },
    };
  };

  postSchedule = async (request, h) => {
    this._validator.validateSchedulePayload(request.payload);

    const { id: credentialId } = request.auth.credentials;
    await this._usersPartnerService.verifyUserExisting(credentialId);

    const { dateStart } = request.payload;

    const isExist = await this._schedulesService.checkScheduleExist(
      credentialId,
      dateStart
    );
    if (isExist) {
      return h
        .response({
          status: 'fail',
          message: 'Schedule already exist',
        })
        .code(400);
    }

    const userId = await this._schedulesService.addSchedule(
      credentialId,
      request.payload
    );
    const response = h.response({
      status: 'success',
      data: {
        userId,
      },
    });
    response.code(201);
    return response;
  };

  putSchedule = async (request) => {
    this._validator.validateScheduleUpdatePayload(request.payload);

    const { id: credentialId } = request.auth.credentials;
    await this._usersPartnerService.verifyUserExisting(credentialId);

    await this._schedulesService.editScheduleById(
      credentialId,
      request.payload
    );
    return {
      status: 'success',
      message: 'Schedule updated successfully',
    };
  };

  deleteScheduleById = async (request, h) => {
    const { id: credentialId } = request.auth.credentials;
    const { scheduleId } = request.params;

    await this._schedulesService.deleteScheduleById(credentialId, scheduleId);

    return h
      .response({
        status: 'success',
        message: 'Jadwal berhasil dihapus',
      })
      .code(200);
  };

  getScheduleByDate = async (request) => {
    this._validator.validateSchedulePayload(request.payload);

    const { id: credentialId } = request.auth.credentials;
    await this._usersClientService.verifyUserExisting(credentialId);

    const partnersList = [];
    const partnersId = await this._schedulesService.getSchedulesByDate(request.payload);

    if (partnersId.length) {
      partnersId.forEach(async (partnerId) => {
        const data = new Promise((resolve, reject) => {
          this._usersPartnerService
            .getUserDetailsById(partnerId.user_id)
            .then((result) => resolve(result))
            .catch((err) => reject(err));
        });
        partnersList.push(data);
      });

      return Promise.all(partnersList).then((partners) => {
        return {
          status: 'success',
          data: {
            partners
          },
        };
      });
    }
  };
}

module.exports = SchedulesHandler;
