import TelegramBot from "node-telegram-bot-api";
import { CallbackQuery } from "./types";
import { selectGroupQueryHandler } from "./group/selectGroup/selectGroupQueryHandler";
import { parseCallbackQueryData } from "../parseCallbackQueryData";
import { deleteGroupHandler } from "./group/deleteGroupHandler";
import { selectSubscriptionHandler } from "./subscription/selectSubscriptionHandler";
import { deleteSubscriptionHandler } from "./subscription/deleteSubscriptionHandler";
import { getScheduleHandler } from "./schedule/getScheduleHandler";

export const callbackQueryHandler = async (ctx: TelegramBot.CallbackQuery) => {
  const { query } = parseCallbackQueryData(ctx);

  const type = query[0];

  query.shift();

  switch (type) {
    case CallbackQuery.SELECT_GROUP: {
      selectGroupQueryHandler(query, ctx);
      break;
    }

    case CallbackQuery.DELETE_GROUP: {
      deleteGroupHandler(query[0], ctx);
      break;
    }

    case CallbackQuery.SELECT_SUBSCRIPTION:
      selectSubscriptionHandler(query[0], ctx);
      break;

    case CallbackQuery.DELETE_SUBSCRIPTION: {
      deleteSubscriptionHandler(query[0], ctx);
      break;
    }

    case CallbackQuery.GET_SCHEDULE:
      getScheduleHandler(ctx);
      break;
  }
};
