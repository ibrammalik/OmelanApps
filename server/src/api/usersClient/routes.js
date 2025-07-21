const routes = (handler) => [
  {
    method: 'POST',
    path: '/register/client',
    handler: handler.postUsersClient
  },
  {
    method: 'GET',
    path: '/details/client',
    handler: handler.getUserClientDetails,
    options: {
      auth: 'omelanapp_jwt'
    }
  },
  {
    method: 'PUT',
    path: '/details/client',
    handler: handler.putUserClientDetails,
    options: {
      auth: 'omelanapp_jwt'
    }
  },
];

module.exports = routes;