import TelegramBot from "node-telegram-bot-api";

export const parseCallbackQueryData = (ctx: TelegramBot.CallbackQuery) => {
  const query = ctx.data.split("/");
  const messageId = ctx.message.message_id;
  const userId = ctx.message.chat.id;

  return {
    query,
    messageId,
    userId,
  };
};
