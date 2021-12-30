import { Request, Response } from "express";

import { CreateGroupUseCase } from "./CreateGroupUseCase";

export class CreateGroupController {
  async handle(request: Request, response: Response): Promise<Response> {
    const group = request.body;

    const createGroupUseCase = new CreateGroupUseCase();

    const newGroup = await createGroupUseCase.execute(group);

    return response.status(201).json(newGroup);
  }
}
