import TelegramBot from "node-telegram-bot-api";
import { selectGroup, showGroupsByFaculty } from "../groups";
import { parseUserData } from "../parseUserData";
import { deleteUserGroup } from "./deleteUserGroup";

export const callbackQueryHandler = async (
  bot: TelegramBot,
  ctx: TelegramBot.CallbackQuery
) => {
  const data = ctx.data.split(" ");

  const type = data[0];

  switch (type) {
    case "selected_faculty":
      showGroupsByFaculty(ctx);
      break;

    case "selected_group":
      selectGroup(ctx);
      break;

    case "deleted_group":
      await deleteUserGroup(ctx);
  }
};
