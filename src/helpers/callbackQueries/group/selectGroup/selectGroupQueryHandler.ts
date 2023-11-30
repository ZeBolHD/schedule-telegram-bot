import TelegramBot from "node-telegram-bot-api";
import { SelectGroupQuery } from "./types";
import { selectGroupFacultyHandler } from "./selectGroupFacultyHandler";
import { selectGroupGradeHandler } from "./selectGroupGradeHandler";
import { selectGroupHandler } from "./selectGroupHandler";

export const selectGroupQueryHandler = (
  query: string[],
  ctx: TelegramBot.CallbackQuery
) => {
  const type = query[0];

  switch (type) {
    case SelectGroupQuery.FACULTY: {
      query.slice(1);
      selectGroupFacultyHandler(query, ctx);
      break;
    }

    case SelectGroupQuery.GROUP: {
      const groupId = Number(query[1]);
      selectGroupHandler(groupId, ctx);
      break;
    }
  }
};
