import { prisma } from "../../../../database/prisma";

export class ListActiveUsersUseCase {
  async execute() {
    const users = await prisma.user.findMany({
      where: {
        active: true,
      },
      select: {
        id: true,
        username: true,
        fullName: true,
        shortName: true,
        email: true,
        avatar: true,
        groups: {
          select: {
            group: {
              select: {
                group: true,
              },
            },
          },
        },
      },
      orderBy: {
        fullName: "asc",
      },
    });

    const usersResult = users.map((user) => {
      return { ...user, groups: user.groups.map((group) => group.group.group) };
    });

    return usersResult;
  }
}
