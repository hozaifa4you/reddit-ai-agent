import type { AIMessage } from '@/types/types';
import { openai } from './ai';
import type { ChatCompletionCreateParamsBase } from 'openai/resources/chat/completions.mjs';
import { zodFunction } from 'openai/helpers/zod';

interface LLMProps {
   message: AIMessage[];
   temperature?: number;
   model?: ChatCompletionCreateParamsBase['model'];
   tools: any[];
}

export const runLLM = async ({
   message,
   model = 'gpt-4o-mini',
   temperature = 0.1,
   tools,
}: LLMProps) => {
   const formattedTools = tools.map(zodFunction);

   const response = await openai.chat.completions.create({
      model: model,
      messages: message,
      temperature: temperature,
      tools: formattedTools,
      tool_choice: 'auto',
      parallel_tool_calls: false,
   });

   return response.choices[0]?.message;
};
