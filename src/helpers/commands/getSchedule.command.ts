import TelegramBot from "node-telegram-bot-api";
import { parseUserData } from "../parseUserData";
import { sendScheduleToUser } from "../sendScheduleToUser";

export const getSchedule = async (userId: string) => {
  await sendScheduleToUser(userId);
};
