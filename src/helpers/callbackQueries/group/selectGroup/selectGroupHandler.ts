import TelegramBot from "node-telegram-bot-api";
import { setUserWithGroup } from "../../../../libs/db/actions";
import { editMessage } from "../../../../libs/botActions/editMessage";
import { parseCallbackQueryData } from "../../../parseCallbackQueryData";
import { sendMessage } from "../../../../libs/botActions/sendMessage";

export const selectGroupHandler = async (
  groupId: number,
  ctx: TelegramBot.CallbackQuery
) => {
  const { userId, messageId } = parseCallbackQueryData(ctx);

  try {
    const group = await setUserWithGroup(userId, groupId);
    editMessage(userId, `Вы выбрали группу: ${group.code}`, messageId);
  } catch (e) {
    sendMessage(userId, "Что-то пошло не так");
  }
};
