import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";

type TokenPayload = {
  sub: string;
};

export async function checkToken(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token are not provided.", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: userId } = verify(
      token,
      <string>process.env.APP_SECRET
    ) as TokenPayload;

    request.userId = userId;

    return next();
  } catch {
    throw new AppError("Invalid token.", 401);
  }
}
