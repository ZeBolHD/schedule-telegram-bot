import { sendDocument } from "../libs/botActions/sendDocument";
import { sendMessage } from "../libs/botActions/sendMessage";
import { getAllUserGroups, getFileIdsByGroupId } from "../libs/db/actions";

export const sendScheduleToUser = async (userId: string) => {
  const groups = await getAllUserGroups(userId);
  const groupIds = groups.map((group) => group.id);

  const fileIds = await getFileIdsByGroupId(groupIds);

  if (groups.length === 0) {
    sendMessage(
      userId,
      "Вы не выбрали ни одну группу. Выбрать группу: /select_group"
    );
    return;
  }

  for (let i = 0; i < groups.length; i++) {
    if (fileIds[i] === null) {
      await sendMessage(
        userId,
        `Расписание группы ${groups[i].code} отсутствует`
      );
      continue;
    }

    const caption = `Расписание группы ${groups[i].code}`;
    await sendDocument(userId, fileIds[i], caption);
  }
};