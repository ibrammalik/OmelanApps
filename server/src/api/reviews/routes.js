const routes = (handler) => [
  {
    method: "GET",
    path: "/reviews/client/summary",
    handler: handler.getClientReviewSummaryHandler,
    options: {
      auth: "omelanapp_jwt",
    },
  },
  {
    method: "PATCH",
    path: "/reviews",
    handler: handler.patchReviewHandler,
    options: {
      auth: "omelanapp_jwt",
    },
  },
  {
    method: "GET",
    path: "/reviews/partner",
    handler: handler.getReviewHandler,
    options: {
      auth: "omelanapp_jwt",
    },
  },
];

module.exports = routes;
