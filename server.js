'use strict';

const path = require('path');
const fs = require('fs');

const initPlugins = require('./plugins');
const initRoutes = require('./routes');

const fastify = require('fastify')({
  logger: true,
  http2: true,
  https: {
    allowHTTP1: true, // fallback support for HTTP1
    key: fs.readFileSync(path.join(__dirname, '.cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '.cert', 'cert.pem')),
  },
});

initPlugins(fastify);
initRoutes(fastify);

// Run the server!
fastify.listen({ port: 5000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server is now listening on ${address}`);
});
