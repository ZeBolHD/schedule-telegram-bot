import { getUserSubscriptionsIdsById } from "../../libs/db/actions";
import { sendMessage } from "../../libs/botActions/sendMessage";
import { Subscriptions } from "./types";
import { CallbackQuery } from "../callbackQueries/types";
import { editMessage } from "../../libs/botActions/editMessage";

export const showSubscriptions = async (userId: string, messageId?: number) => {
  const userSubscriptionsIds = await getUserSubscriptionsIdsById(userId);

  const inline_keyboard = Subscriptions.map((subscription) => {
    const isSelected = userSubscriptionsIds.includes(subscription.id);

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
  });

  const reply_markup = {
    inline_keyboard,
  };

  if (messageId) {
    editMessage(userId, "Ваши подписки:", messageId, reply_markup);
    return;
  }

  sendMessage(userId, "Ваши подписки:", reply_markup);
};
