import TelegramBot from "node-telegram-bot-api";
import { parseUserData } from "../parseUserData";
import { start } from "./start";
import { selectGroup } from "./selectGroup";
import { showSelectedGroups } from "./showSelectedGroups";

export const commandHandler = async (
  bot: TelegramBot,
  ctx: TelegramBot.Message
) => {
  const message = ctx.text;

  switch (message) {
    case "/start":
      start(ctx);
      break;

    case "/select_group":
      selectGroup(ctx);
      break;

    case "/my_groups":
      showSelectedGroups(ctx);
      break;

    default:
      bot.sendMessage(ctx.chat.id, "Такой команды нет");
  }
};
