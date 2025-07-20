require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');

// Users Client
const userClient = require('./api/usersClient');
const UserClientValidator = require('./validators/usersClient');
const UsersClientService = require('./services/postgres/UsersClientServices');

// Users Partner
const userPartner = require('./api/usersPartner');
const UserPartnerValidator = require('./validators/usersPartner');
const UsersPartnerService = require('./services/postgres/UsersPartnerServices');

// Schedules
const schedule = require('./api/schedules');
const SchedulesValidator = require('./validators/schedules');
const ScheduleService = require('./services/postgres/SchedulesService');

// Authentications
const authentication = require('./api/authentications');
const AuthenticationValidator = require('./validators/authentications');
const TokenManager = require('./tokenizer/TokenManager');
const AuthenticationService = require('./services/postgres/AuthenticationsService');

const Init = async () => {
  const usersClientService = new UsersClientService();
  const usersPartnerService = new UsersPartnerService();
  const schedulesService = new ScheduleService();
  const authenticationService = new AuthenticationService();

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
      plugin: Jwt
    }
  ]);

  server.auth.strategy('omelanapp_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id
      }
    })
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
    {
      plugin: schedule,
      options: {
        usersPartnerService,
        schedulesService,
        validator: SchedulesValidator
      }
    },
    {
      plugin: authentication,
      options: {
        usersClientService,
        usersPartnerService,
        tokenManager: TokenManager,
        service: authenticationService,
        validator: AuthenticationValidator
      }
    }
  ]);

  await server.start();
  console.log(`App is running on ${server.info.uri}`);
};

Init();