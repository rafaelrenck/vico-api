import { Request, Response } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user = request.body;

    const createUserUseCase = new CreateUserUseCase();

    const newUser = await createUserUseCase.execute(user);

    return response.status(201).json(newUser);
  }
}
