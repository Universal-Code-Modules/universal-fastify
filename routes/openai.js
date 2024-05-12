const ut = require('../utilities');
const fs = require('fs');
const openAI = ut.safeRequire('universal-llm//OpenAI/openai-connector');


module.exports = function (fastify, opts) {
    if (!openAI) {
        return false;
    }
    // Route to handle POST requests
    fastify.post('/sendMessage', async (request, reply) => {
        const userMessage = request.body.message;
        const response = await openAI.language.generate({text:userMessage});
      
        return { reply: response.message };
    });

    return {'/sendMessage':'POST'};
}