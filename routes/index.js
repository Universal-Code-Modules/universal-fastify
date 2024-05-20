'use strict';

const openAiRoutes = require('./openai');
const hfRoutes = require('./huggingface');

module.exports = (fastify) => {
  fastify.register(openAiRoutes, { prefix: '/openai' });
  fastify.register(hfRoutes, { prefix: '/hf' });
};
