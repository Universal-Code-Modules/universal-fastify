'use strict';

const path = require('node:path');
const corsPlugin = require('@fastify/cors');
const formbodyPlugin = require('@fastify/formbody');
const fastifyStaticPlugin = require('@fastify/static');

const openaiPlugin = require('./openai');
const huggingFacePlugin = require('./huggingface');

module.exports = (fastify) => {
  const { config } = fastify;
  //   fastify.register(require('@fastify/cookie'));
  //   fastify.register(session, {
  //      secret: 'a secret with minimum length of 32 characters'
  //    });

  // Register CORS plugin (if your frontend is served from a different origin)
  fastify.register(corsPlugin, {
    origin: '*',
  });
  fastify.register(formbodyPlugin);
  fastify.register(fastifyStaticPlugin, {
    root: path.join(__dirname, '../public'),
    prefix: '/', // optional: default '/'
    // constraints: { host: 'example.com' } // optional: default {}
  });

  fastify.register(openaiPlugin, config.llm.openai);
  fastify.register(huggingFacePlugin, config.llm.huggingface);
};
