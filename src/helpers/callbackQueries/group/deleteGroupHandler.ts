import TelegramBot from "node-telegram-bot-api";
import { deleteUserWithGroup } from "../../../libs/db/actions";

import { showSelectedGroups } from "../../commands/showSelectedGroups.command";
import { parseCallbackQueryData } from "../../parseCallbackQueryData";

export const deleteGroupHandler = async (
  query: string,
  ctx: TelegramBot.CallbackQuery
) => {
  const groupId = Number(query);
  const { userId, messageId } = parseCallbackQueryData(ctx);

  await deleteUserWithGroup(userId, groupId);

  showSelectedGroups(userId, messageId);
};
