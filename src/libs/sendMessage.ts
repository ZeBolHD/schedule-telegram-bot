import TelegramBot from "node-telegram-bot-api";
import { bot } from "..";

export const sendMessage = async (
  userId: string,
  text: string,
  reply_markup?: TelegramBot.InlineKeyboardMarkup
) => {
  const options: TelegramBot.SendMessageOptions = {
    reply_markup,
  };

  await bot.sendMessage(userId, text, options);
};
