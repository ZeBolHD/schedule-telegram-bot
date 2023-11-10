import TelegramBot from "node-telegram-bot-api";
import { commands } from "./commands";

export const commandHandler = (bot: TelegramBot, ctx: TelegramBot.Message) => {
  const message = ctx.text;

  for (let command of commands) {
    if (command.command === message) {
      bot.sendMessage(ctx.chat.id, command.description);
      return;
    }
  }
};
