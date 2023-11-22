import TelegramBot from "node-telegram-bot-api";
import { BOT_TOKEN } from "./consts";
import { setCommandsToBot } from "../helpers/commands/commands";

export const initialBot = (): TelegramBot => {
  const bot = new TelegramBot(BOT_TOKEN, { polling: true });

  setCommandsToBot(bot);

  console.log("bot is running...");

  return bot;
};
