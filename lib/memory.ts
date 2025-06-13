import { JSONFilePreset } from 'lowdb/node';
import { v4 as uuidv4 } from 'uuid';
import type { AIMessage } from '@/types/types';

export type MessageWithMetadata = AIMessage & {
   id: string;
   createdAt: string;
};

type Data = {
   messages: MessageWithMetadata[];
};

export const addMetadata = (message: AIMessage) => {
   return {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      ...message,
   };
};

export const removeMetadata = (message: MessageWithMetadata): AIMessage => {
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const { id, createdAt, ...rest } = message;

   return rest as AIMessage;
};

const defaultData: Data = {
   messages: [],
};

export const getDb = async () => {
   const db = await JSONFilePreset('db.json', defaultData);

   return db;
};

export const addMessages = async (messages: AIMessage[]) => {
   const db = await getDb();
   db.data.messages.push(...messages.map(addMetadata));
   await db.write();
};

export const getMessages = async () => {
   const db = await getDb();
   return db.data.messages.map(removeMetadata);
};
