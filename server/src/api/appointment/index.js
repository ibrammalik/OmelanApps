const AppointmentHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'appointments',
  version: '1.0.0',
  register: async (server, { notificationPartnerService, notificationClientService, usersPartnerService, usersClientService, schedulesService, reviewService, appointmentService, validator }) => {
    const handler = new AppointmentHandler(notificationPartnerService, notificationClientService, usersPartnerService, usersClientService, schedulesService, reviewService, appointmentService, validator);
    server.route(routes(handler));
  },
};
