import { callbackQueryHandler } from "./helpers/callbackQueries/callbackQueryHandler";
import { commandHandler } from "./helpers/commands/commandsHandler";
import { initialBot } from "./libs/initialBot";

export const bot = initialBot();

const main = async () => {
  bot.on("message", async (ctx) => {
    commandHandler(ctx);
  });

  bot.on("callback_query", async (ctx) => {
    callbackQueryHandler(ctx);
  });
};

main();
