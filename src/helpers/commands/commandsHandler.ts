import TelegramBot from "node-telegram-bot-api";

import { start } from "./start";
import { selectGroup } from "./selectGroup";
import { showSelectedGroups } from "./showSelectedGroups";
import { parseUserData } from "../parseUserData";
import { sendMessage } from "../../libs/sendMessage";
import { showSubscriptions } from "./showSubscriptions";

export const commandHandler = async (ctx: TelegramBot.Message) => {
  const type = ctx.text;
  const { userId } = parseUserData(ctx);

  switch (type) {
    case "/start":
      start(ctx);
      break;

    case "/select_group":
      selectGroup(ctx);
      break;

    case "/my_groups":
      showSelectedGroups(ctx);
      break;

    case "/my_subscriptions":
      showSubscriptions(ctx);
      break;

    default:
      sendMessage(userId, "Такой команды нет");
  }
};
