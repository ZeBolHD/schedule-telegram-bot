import prisma from "./prismadb";
import { User } from "../types";

export const createUser = async (user: User) => {
  await prisma.user.create({
    data: {
      id: user.userId,
      first_name: user.userLastName,
      username: user.username,
    },
  });
};

export const checkUserInDB = async (userId: number) => {
  const userInDB = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return userInDB ? true : false;
};

export const getAllGroups = async () => {
  return (
    await prisma.group.findMany({
      include: {
        faculty: true,
      },
    })
  ).map((group) => ({
    id: group.id,
    code: group.code,
    faculty: group.faculty.name,
  }));
};

export const setGroupToUser = async (userId: number, groupId: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return;
  }

  if (user.groupIds.indexOf(groupId) === -1) {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        groupIds: {
          push: groupId,
        },
      },
    });
  }
};

export const getAllUserGroups = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  const groups = await prisma.group.findMany({
    where: {
      id: {
        in: user!.groupIds,
      },
    },
    include: {
      faculty: true,
    },
  });

  return groups.map((group) => ({
    id: group.id,
    code: group.code,
    faculty: group.faculty.name,
  }));
};
