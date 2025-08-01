require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const Inert = require('@hapi/inert');

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

// Appointments
const AppointmentService = require('./services/postgres/AppointmentService');
const AppointmentValidator = require('./validators/appointment');
const appointments = require('./api/appointment');
const ReviewService = require('./services/postgres/ReviewService');
const ReviewValidator = require('./validators/review');
const reviews = require('./api/reviews');

// Uploads
const uploads = require('./api/uploads');
const StorageServiceAWS = require('./services/s3/StorageService');
const UploadsValidator = require('./validators/uploads');

// Notifications User Client
const notificationsClient = require('./api/notificationsClient');
const NotificationsClientValidator = require('./validators/notifications');
const NotificationsClientService = require('./services/postgres/NotificationsUserClientService');

// Notifications User Partner
const notificationsPartner = require('./api/notificationsPartner');
const NotificationsPartnerValidator = require('./validators/notifications');
const NotificationsPartnerService = require('./services/postgres/NotificationsUserPartnerService');

const Init = async () => {
  const usersClientService = new UsersClientService();
  const usersPartnerService = new UsersPartnerService();
  const schedulesService = new ScheduleService();
  const authenticationService = new AuthenticationService();
  const appointmentService = new AppointmentService();
  const reviewService = new ReviewService();
  const notificationClientService = new NotificationsClientService();
  const notificationPartnerService = new NotificationsPartnerService();
  const storageServiceAWS = new StorageServiceAWS();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: Jwt,
    },
    {
      plugin: Inert,
    },
  ]);

  server.auth.strategy('omelanapp_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

  await server.register([
    {
      plugin: userClient,
      options: {
        service: usersClientService,
        validator: UserClientValidator,
      },
    },
    {
      plugin: userPartner,
      options: {
        service: usersPartnerService,
        validator: UserPartnerValidator,
      },
    },
    {
      plugin: schedule,
      options: {
        usersClientService,
        usersPartnerService,
        schedulesService,
        validator: SchedulesValidator,
      },
    },
    {
      plugin: reviews,
      options: {
        appointmentService,
        service: reviewService,
        validator: ReviewValidator,
      },
    },
    {
      plugin: appointments,
      options: {
        notificationPartnerService,
        notificationClientService,
        usersPartnerService,
        usersClientService,
        schedulesService,
        reviewService,
        appointmentService,
        validator: AppointmentValidator,
      },
    },
    {
      plugin: authentication,
      options: {
        usersClientService,
        usersPartnerService,
        tokenManager: TokenManager,
        service: authenticationService,
        validator: AuthenticationValidator,
      },
    },
    {
      plugin: notificationsClient,
      options: {
        service: notificationClientService,
        validator: NotificationsClientValidator,
      },
    },
    {
      plugin: notificationsPartner,
      options: {
        service: notificationPartnerService,
        validator: NotificationsPartnerValidator,
      },
    },
    {
      plugin: uploads,
      options: {
        usersClientService,
        usersPartnerService,
        service: storageServiceAWS,
        validator: UploadsValidator,
      },
    },
  ]);

  server.ext('onPreResponse', (request, h) => {
    console.log(
      `${request.info.remoteAddress}: ${request.method.toUpperCase()} ${
        request.path
      } --> ${request.response.statusCode}`
    );
    return h.continue;
  });

  await server.start();
  console.log(`App is running on ${server.info.uri}`);
};

Init();
