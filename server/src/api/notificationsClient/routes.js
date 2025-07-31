const routes = (handler) => [
  {
    method: 'GET',
    path: '/notifications/client/all',
    handler: handler.getAllSubjectNotificationsByUserId,
    options: {
      auth: 'omelanapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/notifications/client/unread',
    handler: handler.getUnreadSubjectNotificationsByUserId,
    options: {
      auth: 'omelanapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/notifications/client/{id}',
    handler: handler.getContentNotificationById,
    options: {
      auth: 'omelanapp_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/notifications/client/{id}',
    handler: handler.putStatusRead,
    options: {
      auth: 'omelanapp_jwt',
    },
  }
];

module.exports = routes;
