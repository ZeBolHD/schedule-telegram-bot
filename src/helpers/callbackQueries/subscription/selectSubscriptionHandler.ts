import TelegramBot from "node-telegram-bot-api";
import { parseCallbackQueryData } from "../../parseCallbackQueryData";
import { setUserWithSubscription } from "../../../libs/db/actions";
import { showSubscriptions } from "../../commands/showSubscriptions.command";
import { sendMessage } from "../../../libs/botActions/sendMessage";

export const selectSubscriptionHandler = async (
  query: string,
  ctx: TelegramBot.CallbackQuery
) => {
  const subscriptionId = Number(query);
  const { userId, messageId } = parseCallbackQueryData(ctx);

  try {
    await setUserWithSubscription(userId, subscriptionId);

    showSubscriptions(userId, messageId);
  } catch (e) {
    sendMessage(userId, "Что-то пошло не так");
  }
};
