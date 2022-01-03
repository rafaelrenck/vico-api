import { prisma } from "../../../../database/prisma";
import { AppError } from "../../../../errors/AppError";

type UserGroup = {
  userId: string;
  groupId: string;
};

export class AddUserGroupUseCase {
  async execute({ userId, groupId }: UserGroup) {
    const userExists = await prisma.user.findFirst({
      where: {
        id: {
          equals: userId,
        },
        active: true,
      },
    });

    if (!userExists) {
      throw new AppError("User does not exists.", 406);
    }

    const groupExists = await prisma.group.findFirst({
      where: {
        id: {
          equals: groupId,
        },
        active: true,
      },
    });

    if (!groupExists) {
      throw new AppError("Group does not exists.", 406);
    }

    await prisma.userGroup.create({
      data: { userId, groupId },
    });

    return;
  }
}
