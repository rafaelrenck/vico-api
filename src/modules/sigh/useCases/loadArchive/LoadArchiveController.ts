import { Request, Response } from "express";

import { LoadArchiveUseCase } from "./LoadArchiveUseCase";

export class LoadArchiveController {
  async handle(request: Request, response: Response): Promise<Response> {
    const fiaId = request.params.id;

    const loadArchiveUseCase = new LoadArchiveUseCase();

    const result = await loadArchiveUseCase.execute(fiaId);

    return response.status(200).json(result);
  }
}
