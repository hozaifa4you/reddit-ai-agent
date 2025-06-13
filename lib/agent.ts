import { runLLM } from './llm';
import { addMessages, getMessages } from './memory';
import { logMessage, showLoader } from './ui';

export const runAgent = async ({
   userMessage,
   tools,
}: {
   userMessage: string;
   tools: any[];
}) => {
   await addMessages([{ role: 'user', content: userMessage ?? '' }]);

   const loader = showLoader('Thinking...');
   const history = await getMessages();

   const response = await runLLM({
      message: history,
      tools,
   });

   await addMessages([{ role: 'assistant', content: response?.content ?? '' }]);

   if (response?.tool_calls) {
      console.log('Tool calls: ', response.tool_calls);
   }

   logMessage({
      role: response?.role as 'assistant',
      content: response?.content ?? '',
   });

   loader.succeed('Done');
   loader.stop();

   return getMessages();
};
