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
    path: '/details/partner/{id}',
    handler: handler.getUserPartnerDetailsById
  },
  {
    method: 'GET',
    path: '/details/partner',
    handler: handler.getUserPartnerDetails,
    options: {
      auth: 'omelanapp_jwt'
    }
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