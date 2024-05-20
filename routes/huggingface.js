'use strict';

const root = (fastify) => {
  fastify.post('/sendMessage', async (req) => {
    if (!req.huggingface) {
      throw new Error('HuggingFace plugin has not been configured');
    }
    const userMessage = req.body.message;
    // TODO: Need to add mechanism how to manage chats,
    // now chat gets created on every request
    const chat = req.huggingface.createChat();
    const response = await chat.message(userMessage);

    return { reply: response.message };
  });
};

module.exports = root;
