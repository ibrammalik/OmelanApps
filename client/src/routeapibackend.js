const routes = (handler) => [
  {
    method: "POST",
    path: "/authentications/client",
    handler: handler.postAuthenticationUserClientHandler,
  },
  {
    method: "POST",
    path: "/authentications/partner",
    handler: handler.postAuthenticationUserPartnerHandler,
  },
  {
    method: "PUT",
    path: "/authentications/{any*}",
    handler: handler.putAuthenticationHandler,
  },
  {
    method: "DELETE",
    path: "/authentications/{any*}",
    handler: handler.deleteAuthenticationHandler,
  },
  {
    method: "POST",
    path: "/schedule/partner",
    handler: handler.postSchedule,
    options: {
      auth: "omelanapp_jwt",
    },
  },
  {
    method: "GET",
    path: "/schedule/partner",
    handler: handler.getScheduleById,
    options: {
      auth: "omelanapp_jwt",
    },
  },
  {
    method: "PUT",
    path: "/schedule/partner",
    handler: handler.putSchedule,
    options: {
      auth: "omelanapp_jwt",
    },
  },
  {
    method: "POST",
    path: "/schedule/findByDate",
    handler: handler.getScheduleByDate,
    options: {
      auth: "omelanapp_jwt",
    },
  },
  {
    method: "POST",
    path: "/register/client",
    handler: handler.postUsersClient,
  },
  {
    method: "GET",
    path: "/details/client",
    handler: handler.getUserClientDetails,
    options: {
      auth: "omelanapp_jwt",
    },
  },
  {
    method: "PUT",
    path: "/details/client",
    handler: handler.putUserClientDetails,
    options: {
      auth: "omelanapp_jwt",
    },
  },
  {
    method: "POST",
    path: "/register/partner",
    handler: handler.postUsersPartner,
  },
  {
    method: "GET",
    path: "/list/partner",
    handler: handler.getUsersPartner,
  },
  {
    method: "GET",
    path: "/details/partner/{id}",
    handler: handler.getUserPartnerDetailsById,
  },
  {
    method: "GET",
    path: "/details/partner",
    handler: handler.getUserPartnerDetails,
    options: {
      auth: "omelanapp_jwt",
    },
  },
  {
    method: "PUT",
    path: "/details/partner",
    handler: handler.putUserPartnerDetails,
    options: {
      auth: "omelanapp_jwt",
    },
  },
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
];

module.exports = routes;
