import prisma from "./prismadb";
import { User } from "../../types";

export const createUser = async (user: User) => {
  const { userId, userFirstName, username } = user;

  await prisma.user.create({
    data: {
      id: userId,
      first_name: userFirstName,
      username: username,
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

export const getAllFaculties = async () => {
  const faculties = await prisma.faculty.findMany();

  return faculties;
};

export const getGroupsByFaculty = async (faculty: number) => {
  return (
    await prisma.group.findMany({
      where: {
        facultyId: faculty,
      },
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

export const setUserWithGroup = async (userId: number, groupId: number) => {
  const userWithGroup = await prisma.userWithGroup.findFirst({
    where: {
      userId: userId,
      groupId: groupId,
    },

    include: {
      group: true,
    },
  });

  if (userWithGroup) {
    const { group } = userWithGroup;
    return group;
  }

  const { group } = await prisma.userWithGroup.create({
    data: {
      userId,
      groupId,
    },
    include: {
      group: true,
    },
  });

  return group;
};

export const getGroupById = async (groupId: number) => {
  const group = await prisma.group.findUnique({
    where: {
      id: groupId,
    },
  });

  return group;
};

export const getAllUserGroups = async (userId: number) => {
  const userGroups = await prisma.userWithGroup.findMany({
    where: {
      userId: userId,
    },
    include: {
      group: {
        include: {
          faculty: true,
        },
      },
    },
  });

  return userGroups.map(({ group }) => ({
    id: group.id,
    code: group.code,
    faculty: group.faculty.name,
  }));
};

export const deleteUserWithGroup = async (userId: number, groupId: number) => {
  await prisma.userWithGroup.deleteMany({
    where: {
      userId: userId,
      groupId: groupId,
    },
  });
};
