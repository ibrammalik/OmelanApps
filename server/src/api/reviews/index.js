const ReviewHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'reviews',
  version: '1.0.0',
  register: async (server, { appointmentService, service, validator }) => {
    const handler = new ReviewHandler(appointmentService, service, validator);
    server.route(routes(handler));
  },
};
