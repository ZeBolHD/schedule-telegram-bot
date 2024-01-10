import TelegramBot from "node-telegram-bot-api";
import { deleteUserWithGroup } from "../../../libs/db/actions";

import { showSelectedGroups } from "../../commands/showSelectedGroups.command";
import { parseCallbackQueryData } from "../../parseCallbackQueryData";
import { sendMessage } from "../../../libs/botActions/sendMessage";

export const deleteGroupHandler = async (
  query: string,
  ctx: TelegramBot.CallbackQuery
) => {
  const groupId = Number(query);
  const { userId, messageId } = parseCallbackQueryData(ctx);

  try {
    await deleteUserWithGroup(userId, groupId);
    showSelectedGroups(userId, messageId);
  } catch (e) {
    sendMessage(userId, "Что-то пошло не так");
  }
};
