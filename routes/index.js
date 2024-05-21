'use strict';

const openAiRoutes = require('./openai');
const hfRoutes = require('./huggingface');

module.exports = (fastify) => {
  fastify.register(openAiRoutes, { prefix: '/api/openai' });
  fastify.register(hfRoutes, { prefix: '/api/hf' });
};
