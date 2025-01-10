import OpenAI from 'openai';

export const createOpenAI = () =>
  new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
