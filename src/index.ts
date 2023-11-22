import { callbackQueryHandler } from "./helpers/callbackQueries/callbackQueryHandler";
import { commandHandler } from "./helpers/commands/commandsHandler";
import { selectGroup, showGroupsByFaculty } from "./helpers/groups";
import { initialBot } from "./libs/initialBot";

export const bot = initialBot();

const main = async () => {
  bot.on("message", async (ctx) => {
    commandHandler(bot, ctx);
  });

  bot.on("callback_query", async (ctx) => {
    callbackQueryHandler(bot, ctx);
  });
};

main();
