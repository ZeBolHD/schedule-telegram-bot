import { User } from "@/libs/types";
import TelegramBot from "node-telegram-bot-api";

export const parseUserData = (ctx: TelegramBot.Message): User => {
  const userId = ctx.from!.id;
  const userLastName = ctx.from!.last_name || null;
  const username = ctx.from!.username || null;

  return {
    userId,
    userLastName,
    username,
  };
};
