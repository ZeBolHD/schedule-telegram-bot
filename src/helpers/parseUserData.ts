import { TelegramUser } from "../types";
import TelegramBot from "node-telegram-bot-api";

export const parseUserData = (
  ctx: TelegramBot.Message | TelegramBot.CallbackQuery
): TelegramUser => {
  const userId = ctx.from.id;
  const userFirstName = ctx.from.first_name || null;
  const username = ctx.from.username || null;

  return {
    userId,
    userFirstName,
    username,
  };
};
