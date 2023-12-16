import TelegramBot from "node-telegram-bot-api";
import { parseCallbackQueryData } from "../../parseCallbackQueryData";
import {
  getAllUserGroups,
  getFileIdsByGroupId,
} from "../../../libs/db/actions";
import { sendDocument } from "../../../libs/botActions/sendDocument";
import { sendMessage } from "../../../libs/botActions/sendMessage";
import { deleteMessage } from "../../../libs/botActions/deleteMessage";
import { sendScheduleToUser } from "../../sendScheduleToUser";

export const getScheduleHandler = async (ctx: TelegramBot.CallbackQuery) => {
  const { userId, messageId } = parseCallbackQueryData(ctx);

  await deleteMessage(userId, messageId);

  sendScheduleToUser(userId);
};
