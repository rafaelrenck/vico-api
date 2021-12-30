import { prisma } from "../../../../database/prisma";
import { AppError } from "../../../../errors/AppError";

type Group = {
  group: string;
}

export class CreateGroupUseCase {
  async execute(group: Group) {
    const groupExists = await prisma.group.findFirst({
      where: {
        group: {
          equals: group.group,
          mode: "insensitive",
        },
      },
    });

    if (groupExists) {
      throw new AppError("Group already exists.", 409);
    }

    const result = await prisma.group.create({
      data: group
    });

    return {
      id: result.id,
      group: result.group,
    };
  }
}
