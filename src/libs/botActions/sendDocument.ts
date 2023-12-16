import { bot } from "../..";

export const sendDocument = async (
  chatId: string,
  fileId: string,
  caption?: string
) => {
  await bot.sendDocument(chatId, fileId, {
    caption,
  });
};
