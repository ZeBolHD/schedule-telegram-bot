import TelegramBot from "node-telegram-bot-api";

import { CallbackQuery } from "../types";
import { SelectGroupQuery } from "./types";
import { parseUserData } from "../../parseUserData";
import { getGroupsByFacultyIdAndGrade } from "../../../libs/db/actions";
import { editMessage } from "../../../libs/editMessage";

export const selectGroupGradeHandler = async (
  facultyId: number,
  grade: number,
  ctx: TelegramBot.CallbackQuery
) => {
  const { userId } = parseUserData(ctx);
  const message_id = ctx.message.message_id;

  const groups = await getGroupsByFacultyIdAndGrade(facultyId, grade);

  const reply_markup: TelegramBot.InlineKeyboardMarkup = {
    inline_keyboard: groups.map((group) => [
      {
        text: group.code,
        callback_data: `${CallbackQuery.SELECT_GROUP}/${SelectGroupQuery.GROUP}/${group.id}`,
      },
    ]),
  };

  editMessage("Выберите группу:", userId, message_id, reply_markup);

  // const query = `${CallbackQuery.SELECT_GROUP}/${SelectGroupQuery.GROUP}/`;
};
