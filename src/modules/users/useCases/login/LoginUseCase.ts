import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { prisma } from "../../../../database/prisma";
import { AppError } from "../../../../errors/AppError";

type Credentials = {
  username: string;
  password: string;
}

export class LoginUseCase {
  async execute({ username, password }: Credentials) {
    const userExists = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
        active: true,
      },
      include: {
        groups: true,
      },
    });

    if (!userExists) {
      throw new AppError("Login credentials are incorrect.", 406);
    }

    const passwordMatch = await compare(password, userExists.password);

    if (!passwordMatch) {
      throw new AppError("Login credentials are incorrect.", 406);
    }

    const token = sign({}, <string>process.env.APP_SECRET, {
      subject: userExists.id,
      expiresIn: "1d",
    });

    return {
      user: {
        id: userExists.id,
        username: userExists.username,
        fullName: userExists.fullName,
        shortName: userExists.shortName,
        email: userExists.email,
        avatar: userExists.avatar,
        groups: userExists.groups,
      },
      token,
    };
  }
}
