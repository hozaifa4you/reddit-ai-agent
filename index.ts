import 'dotenv/config';
import { runAgent } from './lib/agent';
import { z } from 'zod';

const userMessage = process.argv[2];

if (!userMessage) {
   console.error('Please provide a user message as an argument.');
   process.exit(1);
}

const weatherTool = {
   name: 'get_weather',
   parameters: z.object({}),
};

const response = await runAgent({
   userMessage,
   tools: [weatherTool],
});

console.log(response);
