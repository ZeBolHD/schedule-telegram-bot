import TelegramBot from "node-telegram-bot-api";
import { start } from "./start";
import { selectGroup } from "./selectGroup";
import { showSelectedGroups } from "./showSelectedGroups";
import { parseUserData } from "../parseUserData";
import { sendMessage } from "../../libs/sendMessage";

export const commandHandler = async (ctx: TelegramBot.Message) => {
  const message = ctx.text;
  const { userId } = parseUserData(ctx);

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
      sendMessage(userId, "Такой команды нет");
  }
};
