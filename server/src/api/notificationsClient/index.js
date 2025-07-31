const NotificationsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'notifications_client',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const usersHandler = new NotificationsHandler(service, validator);
    server.route(routes(usersHandler));
  }
};