import TelegramBot from "node-telegram-bot-api";

import { CallbackQuery } from "../types";
import { SelectGroupQuery } from "./types";
import { parseUserData } from "../../parseUserData";
import { getGroupsByFacultyIdAndGrade } from "../../../libs/db/actions";
import { editMessage } from "../../../libs/editMessage";
import { parseCallbackQueryData } from "../../../libs/parseCallbackQueryData";

export const selectGroupGradeHandler = async (
  facultyId: number,
  grade: number,
  ctx: TelegramBot.CallbackQuery
) => {
  const { userId, messageId } = parseCallbackQueryData(ctx);

  const groups = await getGroupsByFacultyIdAndGrade(facultyId, grade);

  const reply_markup: TelegramBot.InlineKeyboardMarkup = {
    inline_keyboard: groups.map((group) => {
      const query = `${CallbackQuery.SELECT_GROUP}/${SelectGroupQuery.GROUP}/${group.id}`;

      return [
        {
          text: group.code,
          callback_data: query,
        },
      ];
    }),
  };

  editMessage("Выберите группу:", userId, messageId, reply_markup);
};