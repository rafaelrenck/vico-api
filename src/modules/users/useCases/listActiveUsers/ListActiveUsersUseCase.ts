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
        groups: true,
      },
      orderBy: {
        fullName: "asc",
      },
    });

    return users;
  };
}
