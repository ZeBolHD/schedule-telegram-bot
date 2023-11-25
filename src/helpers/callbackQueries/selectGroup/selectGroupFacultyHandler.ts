import TelegramBot from "node-telegram-bot-api";

import { CallbackQuery } from "../types";
import { SelectGroupQuery } from "./types";
import { parseUserData } from "../../parseUserData";
import { getGradesByFacultyId } from "../../../libs/db/actions";
import { editMessage } from "../../../libs/editMessage";

export const selectGroupFacultyHandler = async (
  facultyId: number,
  ctx: TelegramBot.CallbackQuery
) => {
  const { userId } = parseUserData(ctx);
  const message_id = ctx.message.message_id;

  const grades = await getGradesByFacultyId(facultyId);

  const reply_markup: TelegramBot.InlineKeyboardMarkup = {
    inline_keyboard: grades.map((grade) => {
      const query = `${CallbackQuery.SELECT_GROUP}/${SelectGroupQuery.GRADE}/${facultyId}&${grade}`;

      return [
        {
          text: grade.toString(),
          callback_data: query,
        },
      ];
    }),
  };

  editMessage("Выберите курс:", userId, message_id, reply_markup);
};
