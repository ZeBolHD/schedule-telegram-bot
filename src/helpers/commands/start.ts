import { checkUserInDB, createUser } from "../../libs/db/actions";
import TelegramBot from "node-telegram-bot-api";
import { parseUserData } from "../parseUserData";
import { sendMessage } from "../../libs/sendMessage";

export const start = async (ctx: TelegramBot.Message) => {
  const { userId, userFirstName, username } = parseUserData(ctx);

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
    sendMessage(userId, "Вы зарегистрировались в боте");
  } else {
    sendMessage(userId, "Вы уже зарегистрированы");
  }
};
