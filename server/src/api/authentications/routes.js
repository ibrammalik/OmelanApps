const routes = (handler) => [
  {
    method: 'POST',
    path: '/client/authentications',
    handler: handler.postAuthenticationUserClientHandler
  },
  {
    method: 'POST',
    path: '/partner/authentications',
    handler: handler.postAuthenticationUserPartnerHandler
  },
  {
    method: 'PUT',
    path: '/client/authentications',
    handler: handler.putAuthenticationHandler
  },
  {
    method: 'PUT',
    path: '/partner/authentications',
    handler: handler.putAuthenticationHandler
  },
  {
    method: 'DELETE',
    path: '/client/authentications',
    handler: handler.deleteAuthenticationHandler
  },
  {
    method: 'DELETE',
    path: '/partner/authentications',
    handler: handler.deleteAuthenticationHandler
  }
];

module.exports = routes;