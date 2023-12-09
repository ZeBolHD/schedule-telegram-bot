import TelegramBot from "node-telegram-bot-api";
import { parseCallbackQueryData } from "../../../libs/parseCallbackQueryData";
import { setUserWithSubscription } from "../../../libs/db/actions";
import { showSubscriptions } from "../../commands/showSubscriptions.command";

export const selectSubscriptionHandler = async (
  query: string,
  ctx: TelegramBot.CallbackQuery
) => {
  const subscriptionId = Number(query);
  const { userId, messageId } = parseCallbackQueryData(ctx);

  await setUserWithSubscription(userId, subscriptionId);

  showSubscriptions(ctx, messageId);
};
