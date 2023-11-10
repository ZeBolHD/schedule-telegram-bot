import TelegramBot from "node-telegram-bot-api";

type Command = { command: string; description: string };

export const commands: Command[] = [
  {
    command: "/info",
    description: "Бот для вопросов ChatGPT",
  },
  {
    command: "/start",
    description: "Запуск бота",
  },
];

export const setCommandsToBot = (bot: TelegramBot) => {
  bot.setMyCommands(commands);
};
