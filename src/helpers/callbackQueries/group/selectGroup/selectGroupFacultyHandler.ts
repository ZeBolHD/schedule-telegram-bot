import TelegramBot from "node-telegram-bot-api";

import { CallbackQuery } from "../../types";
import { SelectGroupQuery } from "./types";
import { getGradesByFacultyId } from "../../../../libs/db/actions";
import { editMessage } from "../../../../libs/editMessage";
import { selectGroupGradeHandler } from "./selectGroupGradeHandler";
import { parseCallbackQueryData } from "../../../../libs/parseCallbackQueryData";

export const selectGroupFacultyHandler = async (
  query: string[],
  ctx: TelegramBot.CallbackQuery
) => {
  const facultyId = Number(query[1]);

  if (query.length > 2) {
    const grade = Number(query[3]);
    selectGroupGradeHandler(facultyId, grade, ctx);

    return;
  }

  const { userId, messageId } = parseCallbackQueryData(ctx);

  const grades = await getGradesByFacultyId(facultyId);

  const reply_markup: TelegramBot.InlineKeyboardMarkup = {
    inline_keyboard: grades.map((grade) => {
      const query = `${CallbackQuery.SELECT_GROUP}/${SelectGroupQuery.FACULTY}/${facultyId}/${SelectGroupQuery.GRADE}/${grade}`;

      return [
        {
          text: grade.toString(),
          callback_data: query,
        },
      ];
    }),
  };

  editMessage(userId, "Выберите курс:", messageId, reply_markup);
};
