import TelegramBot from "node-telegram-bot-api";
import { selectFaculty, showSelectedGroups } from "../groups";
import { startCommand } from "./commands";
import { parseUserData } from "../parseUserData";

export const commandHandler = async (
  bot: TelegramBot,
  ctx: TelegramBot.Message
) => {
  const message = ctx.text;
  const user = parseUserData(ctx);

  if (message === "/start") {
    startCommand(bot, user);
  } else if (message === "/select_group") {
    selectFaculty(bot, ctx);
  } else if (message === "/my_groups") {
    showSelectedGroups(bot, user.userId);
  } else {
    bot.sendMessage(ctx.chat.id, "Такой команды нет");
  }
};
