import { sendScheduleToUser } from "../sendScheduleToUser";

export const getSchedule = async (userId: string) => {
  await sendScheduleToUser(userId);
};
