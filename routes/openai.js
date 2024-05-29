'use strict';

const root = async (fastify) => {
  fastify.get('/models', async () => {
    if (!fastify.openai) {
      throw new Error('OpenAI plugin has not been configured');
    }
    return {
      list: [
        { name: 'Qwen/Qwen2.5-0.5B-Chat' },
      ]
    };
  });
  fastify.post('/sendMessage', async (req) => {
    if (!fastify.openai) {
      throw new Error('OpenAI plugin has not been configured');
    }
    const text = req.body.query;
    // TODO: Need to add mechanism how to manage chats,
    // now chat gets created on every request
    const chat = fastify.openai.createChat();

    fastify.log.info(`Incoming message: ${text}`);
    const response = await chat.message({ text });

    return { reply: response };
  });
};

module.exports = root;
