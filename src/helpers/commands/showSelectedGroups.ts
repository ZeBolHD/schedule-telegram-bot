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
    inline_keyboard: groups
      .map((group) => {
        const query = `delete_group/${group.id}`;
        return [
          {
            text: group.code + " ❌",
            callback_data: query,
          },
        ];
      })
      .concat([
        [
          {
            text: "Получить расписание",
            callback_data: "фывфа",
          },
        ],
      ]),
  };

  if (groups.length === 0 && messageId) {
    editMessage(
      userId,
      "Вы не выбрали ни одну группу. Выбрать группу: /select_group",
      messageId
    );
    return;
  }

  if (groups.length === 0) {
    sendMessage(
      userId,
      "Вы не выбрали ни одну группу. Выбрать группу: /select_group"
    );
    return;
  }

  if (messageId) {
    editMessage(
      userId,
      "Ваши группы:\nНажмите на группу для удаления",
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
