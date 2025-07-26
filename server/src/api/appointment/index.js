const AppointmentHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "appointments",
  version: "1.0.0",
  register: async (server, { service, validator }) => {
    const appointmenthandler = new AppointmentHandler(service, validator);
    server.route(routes(appointmenthandler));
  },
};
