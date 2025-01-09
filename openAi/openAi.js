import OpenAI from "openai";

const { OPENAI_KEY } = process.env;

const myOpenai = new OpenAI({
  apiKey: OPENAI_KEY,
});

export default myOpenai;
