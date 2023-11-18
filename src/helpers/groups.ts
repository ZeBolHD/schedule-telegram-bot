import TelegramBot from "node-telegram-bot-api";
import { getAllGroups, getAllUserGroups } from "../libs/db/actions";

export const selectGroup = async (
  bot: TelegramBot,
  ctx: TelegramBot.Message
) => {
  const groups = await getAllGroups();

  const options: TelegramBot.SendMessageOptions = {
    reply_markup: {
      inline_keyboard: [
        groups.map((group) => ({
          text: group.code,
          callback_data: group.id.toString(),
        })),
      ],
    },
  };

  await bot.sendMessage(
    ctx.chat.id,
    `Выберите группу:\n${groups
      .map((group) => `${group.code}: ${group.faculty}`)
      .join("\n")}`,
    options
  );
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
