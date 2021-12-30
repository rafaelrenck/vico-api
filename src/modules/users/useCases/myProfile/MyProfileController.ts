import { Request, Response } from "express";

import { MyProfileUseCase } from "./MyProfileUseCase";

export class MyProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.userId;

    const myProfileUseCase = new MyProfileUseCase();

    const user = await myProfileUseCase.execute(id);

    return response.status(202).json(user);
  }
}
