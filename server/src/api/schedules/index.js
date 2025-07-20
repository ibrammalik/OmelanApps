const ScheduleHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'schedules',
  version: '1.0.0',
  register: async (server, { usersPartnerService, schedulesService, validator }) => {
    const usersHandler = new ScheduleHandler(usersPartnerService, schedulesService, validator);
    server.route(routes(usersHandler));
  }
};