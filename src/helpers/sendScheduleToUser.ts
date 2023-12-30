import { sendDocument } from "../libs/botActions/sendDocument";
import { sendMessage } from "../libs/botActions/sendMessage";
import { getAllUserGroups } from "../libs/db/actions";

export const sendScheduleToUser = async (userId: string) => {
  const groups = await getAllUserGroups(userId);

  if (groups.length === 0) {
    sendMessage(
      userId,
      "Вы не выбрали ни одну группу. Выбрать группу: /select_group"
    );
    return;
  }

  for (const group of groups) {
    const fileId = group.fileId;
    const code = group.code;

    if (fileId === null) {
      await sendMessage(userId, `Расписание группы ${code} отсутствует`);
      continue;
    }

    const caption = `Расписание группы ${code}`;
    await sendDocument(userId, fileId, caption);
  }
};
