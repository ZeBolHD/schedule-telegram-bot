import TelegramBot from "node-telegram-bot-api";
import { checkUserInDB, createUser } from "../../libs/db/actions";
import { User } from "../../types";

type Command = { command: string; description: string };

export const commands: Command[] = [
  {
    command: "/start",
    description: "Зарегистрироваться в боте",
  },
  {
    command: "/select_group",
    description: "Выбрать группу",
  },
  {
    command: "/my_groups",
    description: "Мои группы",
  },
];

export const setCommandsToBot = (bot: TelegramBot) => {
  bot.setMyCommands(commands);
};

export const startCommand = async (
  bot: TelegramBot,
  { userId, userFirstName, username }: User
) => {
  if (!userId || !userFirstName || !username) {
    return;
  }

  const user = await checkUserInDB(userId);

  if (!user) {
    const user = {
      userId,
      userFirstName,
      username,
    };
    await createUser(user);
    bot.sendMessage(userId, "Вы зарегистрировались в боте");
  } else {
    bot.sendMessage(userId, "Вы уже зарегистрированы");
  }
};
