import TelegramBot from "node-telegram-bot-api";
import { bot } from "../..";

export const editMessage = async (
  userId: string,
  text: string,
  messageId: number,
  reply_markup?: TelegramBot.InlineKeyboardMarkup
) => {
  const options: TelegramBot.EditMessageTextOptions = {
    chat_id: userId,
    message_id: messageId,
    reply_markup,
  };

  bot.editMessageText(text, options);
};
