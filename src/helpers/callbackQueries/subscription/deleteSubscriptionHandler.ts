import TelegramBot from "node-telegram-bot-api";
import { parseCallbackQueryData } from "../../parseCallbackQueryData";
import { deleteUserWithSubscription } from "../../../libs/db/actions";
import { showSubscriptions } from "../../commands/showSubscriptions.command";

export const deleteSubscriptionHandler = async (
  query: string,
  ctx: TelegramBot.CallbackQuery
) => {
  const subscriptionId = Number(query);
  const { userId, messageId } = parseCallbackQueryData(ctx);

  await deleteUserWithSubscription(userId, subscriptionId);

  showSubscriptions(userId, messageId);
};
