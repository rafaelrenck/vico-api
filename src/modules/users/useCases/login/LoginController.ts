import { Request, Response } from "express";

import { LoginUseCase } from "./LoginUseCase";

export class LoginController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const loginUserUseCase = new LoginUseCase();

    const user = await loginUserUseCase.execute({ username, password });

    return response.status(202).json(user);
  }
}
