const AuthenticationsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'authentications',
  version: '1.0.0',
  register: async (server, { usersClientService, usersPartnerService, tokenManager, service, validator }) => {
    const authenticationsHandler = new AuthenticationsHandler(usersClientService, usersPartnerService, tokenManager, service, validator);
    server.route(routes(authenticationsHandler));
  }
};