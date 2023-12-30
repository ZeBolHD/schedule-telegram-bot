import TelegramBot from "node-telegram-bot-api";
import { parseCallbackQueryData } from "../../parseCallbackQueryData";
import { deleteMessage } from "../../../libs/botActions/deleteMessage";
import { sendScheduleToUser } from "../../sendScheduleToUser";

export const getScheduleHandler = async (ctx: TelegramBot.CallbackQuery) => {
  const { userId, messageId } = parseCallbackQueryData(ctx);

  await deleteMessage(userId, messageId);

  sendScheduleToUser(userId);
};
