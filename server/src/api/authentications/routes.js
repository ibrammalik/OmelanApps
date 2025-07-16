const routes = (handler) => [
  {
    method: 'POST',
    path: '/authentications/client',
    handler: handler.postAuthenticationUserClientHandler
  },
  {
    method: 'POST',
    path: '/authentications/partner',
    handler: handler.postAuthenticationUserPartnerHandler
  },
  {
    method: 'PUT',
    path: '/authentications/{any*}',
    handler: handler.putAuthenticationHandler
  },
  {
    method: 'DELETE',
    path: '/authentications/{any*}',
    handler: handler.deleteAuthenticationHandler
  }
];

module.exports = routes;