import TelegramBot from "node-telegram-bot-api";
import { parseUserData } from "../parseUserData";
import { getUserSubscriptionsById } from "../../libs/db/actions";
import { sendMessage } from "../../libs/sendMessage";
import { Subscriptions } from "./types";
import { Subscription } from "@prisma/client";

export const showSubscriptions = async (ctx: TelegramBot.Message) => {
  const { userId } = parseUserData(ctx);
  const userSubscriptions = await getUserSubscriptionsById(userId);

  const checkSubscription = (subscription: Subscription) => {
    return userSubscriptions.some((userSubscription) => {
      return userSubscription.id === subscription.id;
    });
  };

  const reply_markup = {
    inline_keyboard: Subscriptions.map((subscription) => {
      const isSelected = checkSubscription(subscription);

      const text = `${subscription.name}   ${isSelected ? "✅" : "❌"}`;

      const query = `${isSelected ? "delete_subscription" : "select_group"}/${
        subscription.id
      }`;

      return [
        {
          text: text,
          callback_data: query,
        },
      ];
    }),
  };

  sendMessage(userId, "Ваши подписки:", reply_markup);
};
