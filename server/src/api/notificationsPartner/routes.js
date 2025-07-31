const routes = (handler) => [
  {
    method: 'GET',
    path: '/notifications/partner/all',
    handler: handler.getAllSubjectNotificationsByUserId,
    options: {
      auth: 'omelanapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/notifications/partner/unread',
    handler: handler.getUnreadSubjectNotificationsByUserId,
    options: {
      auth: 'omelanapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/notifications/partner/{id}',
    handler: handler.getContentNotificationById,
    options: {
      auth: 'omelanapp_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/notifications/partner/{id}',
    handler: handler.putStatusRead,
    options: {
      auth: 'omelanapp_jwt',
    },
  }
];

module.exports = routes;
