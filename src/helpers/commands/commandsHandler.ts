import TelegramBot from "node-telegram-bot-api";

import { start } from "./start.command";
import { selectGroup } from "./selectGroup.command";
import { showSelectedGroups } from "./showSelectedGroups.command";
import { parseUserData } from "../parseUserData";
import { sendMessage } from "../../libs/botActions/sendMessage";
import { showSubscriptions } from "./showSubscriptions.command";
import { sendScheduleToUser } from "../sendScheduleToUser";
import { getSchedule } from "./getSchedule.command";

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

    case "/get_schedule":
      getSchedule(ctx);
      break;

    default:
      sendMessage(userId, "Такой команды нет");
  }
};
