const routes = (handler) => [
  {
    method: 'POST',
    path: '/partner/register',
    handler: handler.postUsersPartner
  },
];

module.exports = routes;