import TelegramBot from "node-telegram-bot-api";
import prisma from "./prismadb";

export const createUser = async (ctx: TelegramBot.Message) => {
  const user = ctx.from;

  await prisma.user.create({
    data: {
      id: user.id,
      first_name: user.first_name,
      username: user.username,
    },
  });
};

export const checkUserInDB = async (ctx: TelegramBot.Message) => {
  const user = ctx.from;

  const userInDB = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  return userInDB ? true : false;
};
