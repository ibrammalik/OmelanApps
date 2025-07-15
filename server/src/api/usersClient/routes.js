const routes = (handler) => [
  {
    method: 'POST',
    path: '/register/client',
    handler: handler.postUsersClient
  },
];

module.exports = routes;