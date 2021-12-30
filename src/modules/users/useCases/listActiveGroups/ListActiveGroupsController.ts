import { Request, Response } from "express";

import { ListActiveGroupsUseCase } from "./ListActiveGroupsUseCase";

export class ListActiveGroupsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listActiveGroupsUseCase = new ListActiveGroupsUseCase();

    const groups = await listActiveGroupsUseCase.execute();

    return response.status(200).json(groups);
  }
}
