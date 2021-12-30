import { prisma } from "../../../../database/prisma";
import { AppError } from "../../../../errors/AppError";

export class MyProfileUseCase {
  async execute(id: string) {
    const userExists = await prisma.user.findFirst({
      where: {
        id: {
          equals: id,
        },
        active: true,
      },
      include: {
        groups: true,
      }
    });

    if (!userExists) {
      throw new AppError("User does not exists.", 406);
    }

    return {
      id: userExists.id,
      username: userExists.username,
      fullName: userExists.fullName,
      shortName: userExists.shortName,
      email: userExists.email,
      avatar: userExists.avatar,
      groups: userExists.groups,
    };
  }
}
