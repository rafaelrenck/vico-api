import { Request, Response } from "express";

import { ListActiveUsersUseCase } from "./ListActiveUsersUseCase";

export class ListActiveUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listActiveUsersUseCase = new ListActiveUsersUseCase();

    const users = await listActiveUsersUseCase.execute();

    return response.status(200).json(users);
  }
}
