import TelegramBot from "node-telegram-bot-api";
import { CallbackQuery } from "./types";
import { selectGroupQueryHandler } from "./selectGroup/selectGroupQueryHandler";

export const callbackQueryHandler = async (
  bot: TelegramBot,
  ctx: TelegramBot.CallbackQuery
) => {
  const query = ctx.data.split("/");

  const type = query[0];

  query.shift();

  switch (type) {
    case CallbackQuery.SELECT_GROUP:
      selectGroupQueryHandler(query, ctx);
      break;
  }
};
