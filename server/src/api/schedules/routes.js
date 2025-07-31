const routes = (handler) => [
  {
    method: 'POST',
    path: '/schedule/partner',
    handler: handler.postSchedule,
    options: {
      auth: 'omelanapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/schedule/partner',
    handler: handler.getScheduleByUserId,
    options: {
      auth: 'omelanapp_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/schedule/partner',
    handler: handler.putSchedule,
    options: {
      auth: 'omelanapp_jwt',
    },
  },
  {
    method: 'POST',
    path: '/schedule/findByDate',
    handler: handler.getScheduleByDate,
    options: {
      auth: 'omelanapp_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/schedule/partner/{scheduleId}',
    handler: handler.deleteScheduleById,
    options: {
      auth: 'omelanapp_jwt',
    },
  },
];

module.exports = routes;
