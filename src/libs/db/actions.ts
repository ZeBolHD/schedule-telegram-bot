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

export const getAllFaculties = async () => {
  const faculties = await prisma.faculty.findMany();

  return faculties;
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

export const getGradesByFacultyId = async (facultyId: number) => {
  const groups = await prisma.group.findMany({
    where: {
      facultyId: facultyId,
    },
    select: {
      grade: true,
    },
    orderBy: {
      grade: "asc",
    },
  });
  const set = new Set(groups.map((group) => group.grade));
  const grades = [...set];

  return grades;
};

export const getGroupsByFacultyIdAndGrade = async (
  facultyId: number,
  grade: number
) => {
  const groups = await prisma.group.findMany({
    where: {
      facultyId: facultyId,
      grade: grade,
    },
  });

  return groups;
};

export const getUserSubscriptionsById = async (userId: number) => {
  const userWithSubscriptions = await prisma.userWithSubscription.findMany({
    where: {
      userId: userId,
    },
    select: {
      subscription: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const subscriptions = userWithSubscriptions.map(
    (userWithSubscription) => userWithSubscription.subscription
  );

  return subscriptions;
};

export const setUserWithSubscription = async (
  userId: number,
  subscriptionId: number
) => {
  const userWithSubscription = await prisma.userWithSubscription.findFirst({
    where: {
      userId: userId,
      subscriptionId: subscriptionId,
    },
    include: {
      subscription: true,
    },
  });

  if (userWithSubscription) {
    const { subscription } = userWithSubscription;
    return subscription;
  }

  const { subscription } = await prisma.userWithSubscription.create({
    data: {
      userId,
      subscriptionId,
    },
    include: {
      subscription: true,
    },
  });

  return subscription;
};

export const deleteUserWithSubscription = async (
  userId: number,
  subscriptionId: number
) => {
  await prisma.userWithSubscription.deleteMany({
    where: {
      userId: userId,
      subscriptionId: subscriptionId,
    },
  });
};
