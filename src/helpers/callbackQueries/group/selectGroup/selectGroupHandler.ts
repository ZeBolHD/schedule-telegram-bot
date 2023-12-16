import TelegramBot from "node-telegram-bot-api";
import { setUserWithGroup } from "../../../../libs/db/actions";
import { editMessage } from "../../../../libs/botActions/editMessage";
import { parseCallbackQueryData } from "../../../parseCallbackQueryData";

export const selectGroupHandler = async (
  groupId: number,
  ctx: TelegramBot.CallbackQuery
) => {
  const { userId, messageId } = parseCallbackQueryData(ctx);

  const group = await setUserWithGroup(userId, groupId);

  editMessage(userId, `Вы выбрали группу: ${group.code}`, messageId);
};
