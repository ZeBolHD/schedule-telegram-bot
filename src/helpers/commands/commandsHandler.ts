import TelegramBot from "node-telegram-bot-api";

import { start } from "./start.command";
import { selectGroup } from "./selectGroup.command";
import { showSelectedGroups } from "./showSelectedGroups.command";
import { parseUserData } from "../parseUserData";
import { sendMessage } from "../../libs/botActions/sendMessage";
import { showSubscriptions } from "./showSubscriptions.command";
import { getSchedule } from "./getSchedule.command";

export const commandHandler = async (ctx: TelegramBot.Message) => {
  const type = ctx.text;
  const { userId, userFirstName, username } = parseUserData(ctx);

  switch (type) {
    case "/start":
      start(userId, userFirstName, username);
      break;

    case "/select_group":
      selectGroup(userId);
      break;

    case "/my_groups":
      showSelectedGroups(userId);
      break;

    case "/my_subscriptions":
      showSubscriptions(userId);
      break;

    case "/get_schedule":
      getSchedule(userId);
      break;

    default:
      sendMessage(userId, "Такой команды нет");
  }
};
