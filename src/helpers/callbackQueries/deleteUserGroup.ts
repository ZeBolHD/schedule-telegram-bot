import TelegramBot from "node-telegram-bot-api";
import { parseUserData } from "../parseUserData";
import { deleteUserWithGroup } from "../../libs/db/actions";

import { showSelectedGroups } from "../commands/showSelectedGroups";

export const deleteUserGroup = async (ctx: TelegramBot.CallbackQuery) => {
  const data = ctx.data.split(" ");
  const groupId = Number(data[1]);
  const { userId } = parseUserData(ctx);
  const messageId = ctx.message.message_id;

  await deleteUserWithGroup(userId, groupId);

  showSelectedGroups(ctx, messageId);
};
