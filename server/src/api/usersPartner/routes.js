const routes = (handler) => [
  {
    method: 'POST',
    path: '/register/partner',
    handler: handler.postUsersPartner
  },
];

module.exports = routes;