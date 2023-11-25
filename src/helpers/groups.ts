import TelegramBot from "node-telegram-bot-api";
import { getGroupsByFaculty } from "../libs/db/actions";
import { editMessage } from "../libs/editMessage";

export const showGroupsByFaculty = async (ctx: TelegramBot.CallbackQuery) => {
  const data = ctx.data.split(" ");

  const facultyId = Number(data[1]);
  const userId = ctx.from.id;
  const messageId = ctx.message.message_id;

  const groups = await getGroupsByFaculty(facultyId);

  const reply_markup = {
    inline_keyboard: groups.map((group) => [
      {
        text: group.code,
        callback_data: `selected_group ${group.id}`,
      },
    ]),
  };

  editMessage("Выберите группу:", userId, messageId, reply_markup);
};
