'use strict';

const fp = require('fastify-plugin');
const { huggingface: huggingfaceLib } = require('universal-llm/lib');

const huggingfacePlugin = async (fastify, options = {}) => {
  fastify.log.info('Initializing HuggingFace Plugin');

  if (!options.enabled) {
    return void fastify.log.info('Skip Initializing HuggingFace Plugin');
  }

  if (!fastify.huggingface) {
    const obj = {};
    if (options.chat) {
      obj.createChat = (opts = {}) => new huggingfaceLib.Chat({
        ...opts, ...options.chat
      });
    }
    if (options.assistant) {
      obj.createAssistant = (opts = {}) => new huggingfaceLib.Assistant({
        ...opts, ...options.assistant
      });
    }
    fastify.decorate('huggingface', obj);
  }
};

module.exports = fp(huggingfacePlugin, {
  fastify: '4.x',
});
