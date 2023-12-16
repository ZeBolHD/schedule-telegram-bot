import TelegramBot from "node-telegram-bot-api";
import { parseUserData } from "../parseUserData";
import { sendScheduleToUser } from "../sendScheduleToUser";

export const getSchedule = async (ctx: TelegramBot.Message) => {
  const { userId } = parseUserData(ctx);

  await sendScheduleToUser(userId);
};
