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
      const facultyId = Number(query[1]);
      selectGroupFacultyHandler(facultyId, ctx);
      break;
    }

    case SelectGroupQuery.GRADE: {
      const gradeAndFacultyId = query[1].split("&");
      const facultyId = Number(gradeAndFacultyId[0]);
      const grade = Number(gradeAndFacultyId[1]);
      selectGroupGradeHandler(facultyId, grade, ctx);
      break;
    }

    case SelectGroupQuery.GROUP: {
      const groupId = Number(query[1]);
      selectGroupHandler(groupId, ctx);
      break;
    }
  }
};
