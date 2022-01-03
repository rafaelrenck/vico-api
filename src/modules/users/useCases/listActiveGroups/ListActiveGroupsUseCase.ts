import { prisma } from "../../../../database/prisma";

export class ListActiveGroupsUseCase {
  async execute() {
    const groups = await prisma.group.findMany({
      where: {
        active: true,
      },
      select: {
        id: true,
        group: true,
        users: true,
      },
      orderBy: {
        group: "asc",
      },
    });

    return groups;
  }
}
