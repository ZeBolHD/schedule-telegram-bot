import { getUserSubscriptionsById } from "../../libs/db/actions";
import { sendMessage } from "../../libs/botActions/sendMessage";
import { Subscriptions } from "./types";
import { Subscription } from "@prisma/client";
import { CallbackQuery } from "../callbackQueries/types";
import { editMessage } from "../../libs/botActions/editMessage";

export const showSubscriptions = async (userId: string, messageId?: number) => {
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

      const query = `${
        isSelected
          ? CallbackQuery.DELETE_SUBSCRIPTION
          : CallbackQuery.SELECT_SUBSCRIPTION
      }/${subscription.id}`;

      return [
        {
          text: text,
          callback_data: query,
        },
      ];
    }),
  };

  if (messageId) {
    editMessage(userId, "Ваши подписки:", messageId, reply_markup);
    return;
  }

  sendMessage(userId, "Ваши подписки:", reply_markup);
};
