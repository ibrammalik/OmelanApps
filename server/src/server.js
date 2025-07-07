require('dotenv').config();
const Hapi = require('@hapi/hapi');

const Init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*']
      }
    }
  })

  await server.start();
  console.log(`App is running on ${server.info.uri}`)
}

Init();