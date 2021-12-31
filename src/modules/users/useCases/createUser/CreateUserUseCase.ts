import { hash } from "bcrypt";

import { prisma } from "../../../../database/prisma";
import { AppError } from "../../../../errors/AppError";

type User = {
  username: string;
  password: string;
  fullName: string;
  shortName: string;
  email?: string;
  avatar?: string;
}

export class CreateUserUseCase {
  async execute(user: User) {
    const userExists = await prisma.user.findFirst({
      where: {
        username: {
          equals: user.username,
          mode: "insensitive",
        },
      },
    });

    if (userExists) {
      throw new AppError("Username already taken.", 409);
    }

    if (user.email) {
      const emailInUse = await prisma.user.findFirst({
        where: {
          email: {
            equals: user.email,
            mode: "insensitive",
          },
        },
      });

      if (emailInUse) {
        throw new AppError("E-mail already in use.", 409);
      }
    }

    const hashedPassword = await hash(user.password, 10);

    const newUser = { ...user, password: hashedPassword };

    const result = await prisma.user.create({
      data: newUser
    });

    return {
      id: result.id,
      username: result.username,
    };
  }
}
