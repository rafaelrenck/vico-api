import { Request, Response } from "express";

import { AddUserGroupUseCase } from "./AddUserGroupUseCase";

export class AddUserGroupController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userId, groupId } = request.params;

    const addUserGroupUseCase = new AddUserGroupUseCase();

    await addUserGroupUseCase.execute({ userId, groupId });

    return response.status(201);
  }
}
