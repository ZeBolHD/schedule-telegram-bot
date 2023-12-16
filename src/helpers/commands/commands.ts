import TelegramBot from "node-telegram-bot-api";

type Command = { command: string; description: string };

export const commands: Command[] = [
  {
    command: "/select_group",
    description: "Выбрать группу",
  },
  {
    command: "/my_groups",
    description: "Мои группы",
  },
  {
    command: "/my_subscriptions",
    description: "Мои подписки",
  },
  {
    command: "/get_schedule",
    description: "Получить расписание",
  },
];

export const setCommandsToBot = (bot: TelegramBot) => {
  bot.setMyCommands(commands);
};
