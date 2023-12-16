import { bot } from "../..";

export const deleteMessage = async (chatId: string, messageId: number) => {
  bot.deleteMessage(chatId, messageId);
};
