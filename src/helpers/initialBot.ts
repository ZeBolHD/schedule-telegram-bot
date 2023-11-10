import TelegramBot from "node-telegram-bot-api";
import { BOT_TOKEN } from "../libs/consts";
import { setCommandsToBot } from "./commands/commands";

export const initialBot = (): TelegramBot => {
  const bot = new TelegramBot(BOT_TOKEN, { polling: true });

  setCommandsToBot(bot);

  return bot;
};
