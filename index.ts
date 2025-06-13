import 'dotenv/config';
import { runLLM } from './lib/llm';

const userMessage = process.argv[2];

if (!userMessage) {
   console.error('Please provide a user message as an argument.');
   process.exit(1);
}

const response = await runLLM({
   message: [{ role: 'user', content: userMessage }],
   model: 'gpt-4o-mini',
   temperature: 0.2,
});

console.log(response);
