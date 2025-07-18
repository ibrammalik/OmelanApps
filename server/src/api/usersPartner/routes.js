const routes = (handler) => [
  {
    method: 'POST',
    path: '/register/partner',
    handler: handler.postUsersPartner
  },
  {
    method: 'GET',
    path: '/list/partner',
    handler: handler.getUsersPartner
  },
  {
    method: 'GET',
    path: '/list/partner/{id}',
    handler: handler.getUserPartnerDetailsById
  },
  {
    method: 'PUT',
    path: '/details/partner',
    handler: handler.putUserPartnerDetails,
    options: {
      auth: 'omelanapp_jwt'
    }
  },
];

module.exports = routes;