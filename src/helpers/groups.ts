import TelegramBot from "node-telegram-bot-api";
import {
  getAllFaculties,
  getAllGroups,
  getAllUserGroups,
  getGroupsByFaculty,
  setGroupToUser,
} from "../libs/db/actions";

export const selectFaculty = async (
  bot: TelegramBot,
  ctx: TelegramBot.Message
) => {
  const faculties = await getAllFaculties();

  const options: TelegramBot.SendMessageOptions = {
    reply_markup: {
      inline_keyboard: faculties.map((faculty) => [
        {
          text: faculty.name,
          callback_data: `selected_faculty ${faculty.id}`,
        },
      ]),
    },
  };

  await bot.sendMessage(ctx.chat.id, "Выберите факультет:", options);
};

export const selectGroup = async (
  bot: TelegramBot,
  ctx: TelegramBot.CallbackQuery
) => {
  const data = ctx.data.split(" ");

  const groupId = Number(data[1]);
  const userId = ctx.from.id;
  const msg = ctx.message;

  const group = await setGroupToUser(userId, groupId);
  const options = {
    chat_id: userId,
    message_id: msg!.message_id,
  };

  bot.editMessageText(`Вы выбрали группу: ${group.code}`, options);
};

export const showSelectedGroups = async (bot: TelegramBot, userId: number) => {
  const groups = await getAllUserGroups(userId);

  bot.sendMessage(
    userId,
    `Ваши группы:\n${groups
      .map((group) => `${group.code}: ${group.faculty}`)
      .join("\n")}`
  );
};

export const showGroupsByFaculty = async (
  bot: TelegramBot,
  ctx: TelegramBot.CallbackQuery
) => {
  const data = ctx.data.split(" ");

  const facultyId = Number(data[1]);
  const userId = ctx.from.id;
  const msg = ctx.message;

  const groups = await getGroupsByFaculty(facultyId);

  const options = {
    chat_id: userId,
    message_id: msg!.message_id,
    reply_markup: {
      inline_keyboard: groups.map((group) => [
        {
          text: group.code,
          callback_data: `selected_group ${group.id}`,
        },
      ]),
    },
  };

  bot.editMessageText("Выберите группу:", options);
};
