import { getAllUserGroups } from "../../libs/db/actions";
import { sendMessage } from "../../libs/sendMessage";
import TelegramBot from "node-telegram-bot-api";
import { parseUserData } from "../parseUserData";
import { editMessage } from "../../libs/editMessage";

export const showSelectedGroups = async (
  ctx: TelegramBot.Message | TelegramBot.CallbackQuery,
  messageId?: number
) => {
  const { userId } = parseUserData(ctx);

  const groups = await getAllUserGroups(userId);

  const reply_markup = {
    inline_keyboard: groups.map((group) => {
      const query = `delete_group/${group.id}`;
      return [
        {
          text: group.code + " ❌",
          callback_data: query,
        },
      ];
    }),
  };

  if (messageId) {
    editMessage(
      "Ваши группы:\nНажмите на группу для удаления",
      userId,
      messageId,
      reply_markup
    );

    return;
  }

  sendMessage(
    userId,
    `Ваши группы:\nНажмите на группу для удаления`,
    reply_markup
  );
};
