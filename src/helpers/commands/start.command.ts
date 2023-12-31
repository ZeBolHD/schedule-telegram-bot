import { checkUserInDB, createUser } from "../../libs/db/actions";
import TelegramBot from "node-telegram-bot-api";
import { parseUserData } from "../parseUserData";
import { sendMessage } from "../../libs/botActions/sendMessage";
import { TelegramUser } from "../../types";

export const start = async (
  userId: string,
  userFirstName: string,
  username: string
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
    sendMessage(
      userId,
      "Привет! Чтобы подписаться на рассылку, выберите группу при помощи команды: /select_group"
    );
  } else {
    sendMessage(
      userId,
      "Вы уже зарегистрированы в боте. Чтобы подписаться на рассылку, выберите группу при помощи команды: /select_group"
    );
  }
};
