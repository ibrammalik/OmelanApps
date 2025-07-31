const routes = require('./routes');
const UploadsHandler = require('./handler');

module.exports = {
  name: 'uploads',
  version: '1.0.0',
  register: (server, { usersClientService, usersPartnerService, service, validator }) => {
    const uploadsHandler = new UploadsHandler(usersClientService, usersPartnerService, service, validator);
    server.route(routes(uploadsHandler));
  }
};