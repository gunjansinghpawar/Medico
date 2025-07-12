// utils/chatHelpers.ts

export type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

export type ChatHistoryItem = {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
};

export const loadChatHistory = (): ChatHistoryItem[] => {
  const saved = localStorage.getItem('chatHistory');
  if (!saved) return [];
  return JSON.parse(saved).map((chat: ChatHistoryItem) => ({
    ...chat,
    timestamp: new Date(chat.timestamp),
  }));
};

export const saveChatHistory = (history: ChatHistoryItem[]) => {
  localStorage.setItem('chatHistory', JSON.stringify(history));
};

export const loadMessages = (chatId: string): Message[] => {
  const saved = localStorage.getItem(`chat_${chatId}`);
  if (!saved) return [];
  return JSON.parse(saved).map((msg: Message) => ({
    ...msg,
    timestamp: new Date(msg.timestamp),
  }));
};

export const saveMessages = (chatId: string, messages: Message[]) => {
  localStorage.setItem(`chat_${chatId}`, JSON.stringify(messages));
};

export const saveCurrentChatId = (chatId: string) => {
  localStorage.setItem('currentChatId', chatId);
};

export const loadCurrentChatId = (): string | null => {
  return localStorage.getItem('currentChatId');
};

export const deleteChatFromStorage = (chatId: string) => {
  localStorage.removeItem(`chat_${chatId}`);
};
