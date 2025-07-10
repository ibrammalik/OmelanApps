const routes = (handler) => [
  {
    method: 'POST',
    path: '/client/register',
    handler: handler.postUsersClient
  },
];

module.exports = routes;