import { commandHandler } from "./helpers/commands/commandsHandler";
import { selectGroup, showGroupsByFaculty } from "./helpers/groups";
import { initialBot } from "./helpers/initialBot";

const bot = initialBot();

console.log("bot is running...");

const main = async () => {
  bot.on("message", async (ctx) => {
    commandHandler(bot, ctx);
  });

  bot.on("callback_query", async (ctx) => {
    const data = ctx.data.split(" ");

    if (data[0] === "selected_faculty") {
      showGroupsByFaculty(bot, ctx);
    }

    if (data[0] === "selected_group") {
      selectGroup(bot, ctx);
    }
  });
};

main();
