import TelegramBot from "node-telegram-bot-api";
import { CallbackQuery } from "./types";
import { selectGroupQueryHandler } from "./selectGroup/selectGroupQueryHandler";
import { parseCallbackQueryData } from "../../libs/parseCallbackQueryData";

export const callbackQueryHandler = async (ctx: TelegramBot.CallbackQuery) => {
  const { query } = parseCallbackQueryData(ctx);

  const type = query[0];

  query.shift();

  switch (type) {
    case CallbackQuery.SELECT_GROUP:
      selectGroupQueryHandler(query, ctx);
      break;
  }
};
