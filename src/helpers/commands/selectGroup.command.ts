import TelegramBot from "node-telegram-bot-api";
import { parseUserData } from "../parseUserData";
import { getAllFaculties } from "../../libs/db/actions";
import { sendMessage } from "../../libs/botActions/sendMessage";
import { CallbackQuery } from "../callbackQueries/types";
import { SelectGroupQuery } from "../callbackQueries/group/selectGroup/types";

const selectFaculty = async (userId: string) => {
  const faculties = await getAllFaculties();
  const reply_markup = {
    inline_keyboard: faculties.map((faculty) => [
      {
        text: faculty.name,
        callback_data: `${CallbackQuery.SELECT_GROUP}/${SelectGroupQuery.FACULTY}/${faculty.id}`,
      },
    ]),
  };

  await sendMessage(userId, "Выберите факультет:", reply_markup);
};

export const selectGroup = async (userId: string) => {
  await selectFaculty(userId);
};
