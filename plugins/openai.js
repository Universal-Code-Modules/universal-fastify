'use strict';

const fp = require('fastify-plugin');
const { openai: openaiLib } = require('universal-llm/lib');

const openaiPlugin = async (fastify, options = {}) => {
  fastify.log.info('Initializing OpenAI Plugin');

  if (!options.enabled) {
    return void fastify.log.info('Skip Initializing OpenAI Plugin');
  }

  if (!fastify.openai) {
    const openai = {};
    if (options.chat) {
      openai.createChat = (opts = {}) => new openaiLib.Chat({
        ...opts, ...options.chat
      });
    }
    if (options.assistant) {
      openai.createAssistant = (opts = {}) => new openaiLib.Assistant({
        ...opts, ...options.assistant
      });
    }
    fastify.decorate('openai', openai);
  }

  if (!fastify.openai) {
    fastify.log.info('Skip Initializing OpenAI Plugin');
  }
};

module.exports = fp(openaiPlugin, {
  fastify: '4.x',
});
