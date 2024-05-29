'use strict';

const root = async (fastify) => {
  fastify.get('/models', async () => {
    if (!fastify.huggingface) {
      throw new Error('HuggingFace plugin has not been configured');
    }
    return {
      list: [
        { name: 'Qwen/Qwen1.5-0.5B-Chat' },
      ]
    };
  });
  fastify.post('/sendMessage', async (req) => {
    if (!fastify.huggingface) {
      throw new Error('HuggingFace plugin has not been configured');
    }
    const text = req.body.query;
    // TODO: Need to add mechanism how to manage chats,
    // now chat gets created on every request
    const chat = fastify.huggingface.createChat();
    fastify.log.info(`Incoming message: ${text}`);
    const response = await chat.message({ text });

    return { reply: response.message };
  });
};

module.exports = root;
