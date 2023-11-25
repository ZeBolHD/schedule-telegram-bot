import TelegramBot from "node-telegram-bot-api";
import { parseUserData } from "../../parseUserData";
import { setUserWithGroup } from "../../../libs/db/actions";
import { editMessage } from "../../../libs/editMessage";

export const selectGroupHandler = async (
  groupId: number,
  ctx: TelegramBot.CallbackQuery
) => {
  const { userId } = parseUserData(ctx);
  const message_id = ctx.message.message_id;

  const group = await setUserWithGroup(userId, groupId);

  editMessage(`Вы выбрали группу: ${group.code}`, userId, message_id);
};
