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
    path: '/authentications/client',
    handler: handler.putAuthenticationHandler
  },
  {
    method: 'PUT',
    path: '/authentications/partner',
    handler: handler.putAuthenticationHandler
  },
  {
    method: 'DELETE',
    path: '/authentications/client',
    handler: handler.deleteAuthenticationHandler
  },
  {
    method: 'DELETE',
    path: '/authentications/partner',
    handler: handler.deleteAuthenticationHandler
  }
];

module.exports = routes;