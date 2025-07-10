require('dotenv').config();
const Hapi = require('@hapi/hapi');

// Users Client
const userClient = require('./api/usersClient');
const UserClientValidator = require('./validators/usersClient');
const UsersClientService = require('./services/postgres/UsersClientServices');

// Users Partner
const userPartner = require('./api/usersPartner');
const UserPartnerValidator = require('./validators/usersPartner');
const UsersPartnerService = require('./services/postgres/UsersPartnerServices');

const Init = async () => {
  const usersClientService = new UsersClientService();
  const usersPartnerService = new UsersPartnerService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*']
      }
    }
  });

  await server.register([
    {
      plugin: userClient,
      options: {
        service: usersClientService,
        validator: UserClientValidator
      }
    },
    {
      plugin: userPartner,
      options: {
        service: usersPartnerService,
        validator: UserPartnerValidator
      }
    },
  ]);

  await server.start();
  console.log(`App is running on ${server.info.uri}`);
};

Init();