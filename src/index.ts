import { initialBot } from "./helpers/initialBot";
import { checkUserInDB, createUser } from "./libs/db/actions";

const bot = initialBot();

console.log("bot is running...");

const main = async () => {
  bot.on("message", async (ctx) => {
    const message = ctx.text as string;

    if (message === "/start") {
      const user = await checkUserInDB(ctx);

      if (!user) {
        await createUser(ctx);
        bot.sendMessage(ctx.chat.id, "Вы зарегистрировались в боте");
      } else {
        bot.sendMessage(ctx.chat.id, "Вы уже зарегистрированы");
      }
    }
  });
};

main();
