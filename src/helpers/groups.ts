import TelegramBot from "node-telegram-bot-api";
import {
  getAllFaculties,
  getGroupsByFaculty,
  setUserWithGroup,
} from "../libs/db/actions";
import { editMessage } from "../libs/editMessage";
import { sendMessage } from "../libs/sendMessage";
import { parseUserData } from "./parseUserData";

export const selectFaculty = async (ctx: TelegramBot.Message) => {
  const { userId } = parseUserData(ctx);

  const faculties = await getAllFaculties();
  const reply_markup = {
    inline_keyboard: faculties.map((faculty) => [
      {
        text: faculty.name,
        callback_data: `selected_faculty ${faculty.id}`,
      },
    ]),
  };

  await sendMessage(userId, "Выберите факультет:", reply_markup);
};

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

export const selectGroup = async (ctx: TelegramBot.CallbackQuery) => {
  const data = ctx.data.split(" ");

  const groupId = Number(data[1]);
  const userId = ctx.from.id;
  const messageId = ctx.message.message_id;

  const group = await setUserWithGroup(userId, groupId);

  editMessage(`Вы выбрали группу: ${group.code}`, userId, messageId);
};
