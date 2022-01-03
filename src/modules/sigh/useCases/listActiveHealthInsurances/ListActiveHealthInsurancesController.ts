import { Request, Response } from "express";

import { ListActiveHealthInsurancesUseCase } from "./ListActiveHealthInsurancesUseCase";

export class ListActiveHealthInsurancesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listActiveHealthInsurancesUseCase =
      new ListActiveHealthInsurancesUseCase();

    const healthInsurances = await listActiveHealthInsurancesUseCase.execute();

    return response.status(200).json(healthInsurances);
  }
}
