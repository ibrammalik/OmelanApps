const routes = (handler) => [
  {
    method: "POST",
    path: "/user/upload/photo",
    handler: handler.postUploadImageHandler,
    options: {
      payload: {
        allow: "multipart/form-data",
        multipart: true,
        output: "stream",
        maxBytes: 512000,
      },
      auth: "omelanapp_jwt",
    },
  },
];

module.exports = routes;
