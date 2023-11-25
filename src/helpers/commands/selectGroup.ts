import TelegramBot from "node-telegram-bot-api";
import { parseUserData } from "../parseUserData";
import { getAllFaculties } from "../../libs/db/actions";
import { sendMessage } from "../../libs/sendMessage";

const selectFaculty = async (ctx: TelegramBot.Message) => {
  const { userId } = parseUserData(ctx);

  const faculties = await getAllFaculties();
  const reply_markup = {
    inline_keyboard: faculties.map((faculty) => [
      {
        text: faculty.name,
        callback_data: `select_group/faculty/${faculty.id}`,
      },
    ]),
  };

  await sendMessage(userId, "Выберите факультет:", reply_markup);
};

export const selectGroup = async (ctx: TelegramBot.Message) => {
  await selectFaculty(ctx);
};
