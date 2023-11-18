import { commandHandler } from "./helpers/commands/commandsHandler";
import { initialBot } from "./helpers/initialBot";
import { setGroupToUser } from "./libs/db/actions";

const bot = initialBot();

console.log("bot is running...");

const main = async () => {
  bot.on("message", async (ctx) => {
    commandHandler(bot, ctx);
  });

  bot.on("callback_query", async (ctx) => {
    const groupCode = ctx.data;

    const userId = ctx.from.id;
    const msg = ctx.message;
    const opts = {
      chat_id: msg!.chat.id,
      message_id: msg!.message_id,
    };

    if (!groupCode) {
      return;
    }

    setGroupToUser(userId, +groupCode);

    bot.editMessageText(`Вы выбрали группу: ${groupCode}`, opts);
  });
};

main();
