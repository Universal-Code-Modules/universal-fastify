'use strict';

const config = require('config');

module.exports = (fastify) => {
  fastify.decorate('config', config);
};
