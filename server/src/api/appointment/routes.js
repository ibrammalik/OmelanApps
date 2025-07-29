const routes = (handler) => [
  {
    method: "POST",
    path: "/appointments",
    handler: handler.postAppointmentHandler,
    options: {
      auth: "omelanapp_jwt",
    },
  },
  {
    method: "GET",
    path: "/appointments/partner",
    handler: handler.getAppointmentsByPartnerHandler,
    options: {
      auth: "omelanapp_jwt",
    },
  },
  {
    method: "PATCH",
    path: "/appointments/{id}/status",
    handler: handler.updateAppointmentStatusHandler,
    options: {
      auth: "omelanapp_jwt",
    },
  },
  {
    method: "GET",
    path: "/appointments/client",
    handler: handler.getAppointmentsByClientHandler,
    options: {
      auth: "omelanapp_jwt",
    },
  },
  //   {
  //     method: "PUT",
  //     path: "/appointments/{appointmentId}/status",
  //     handler: handler.putAppointmentStatusHandler,
  //     options: {
  //       auth: "omelanapp_jwt",
  //     },
  //   },
];

module.exports = routes;
