import type { AIMessage } from '@/types/types';
import { openai } from './ai';
import type { ChatCompletionCreateParamsBase } from 'openai/resources/chat/completions.mjs';

interface LLMProps {
   message: AIMessage[];
   temperature?: number;
   model?: ChatCompletionCreateParamsBase['model'];
}

export const runLLM = async ({
   message,
   model = 'gpt-4o-mini',
   temperature,
}: LLMProps) => {
   const response = await openai.chat.completions.create({
      model: model,
      messages: message,
      temperature: temperature,
   });

   return response.choices[0]?.message.content;
};
