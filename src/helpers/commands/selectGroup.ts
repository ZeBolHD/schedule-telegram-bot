import TelegramBot from "node-telegram-bot-api";
import { selectFaculty } from "../groups";

export const selectGroup = async (ctx: TelegramBot.Message) => {
  await selectFaculty(ctx);
};
