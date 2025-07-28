const AppointmentHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "appointments",
  version: "1.0.0",
  register: async (
    server,
    { appointmentService, validator, reviewService }
  ) => {
    const handler = new AppointmentHandler(
      appointmentService,
      validator,
      reviewService
    );
    server.route(routes(handler));
  },
};
