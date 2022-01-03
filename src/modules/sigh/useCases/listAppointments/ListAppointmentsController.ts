import { Request, Response } from "express";

import { ListAppointmentsUseCase } from "./ListAppointmentsUseCase";

export class ListAppointmentsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const types = [];
    request.query.amb === "true" && types.push("AMB");
    request.query.ext === "true" && types.push("EXT");
    request.query.int === "true" && types.push("INT");

    const filter = {
      month: request.query.month?.toString() || "",
      types,
      insurance: request.query.insurance?.toString() || "",
      invoice: request.query.invoice?.toString() || "",
      patient: request.query.patient?.toString() || "",
      page: Number(request.query.page) || 1,
    };

    const listAppointmentsUseCase = new ListAppointmentsUseCase();

    const result = await listAppointmentsUseCase.execute(filter);

    return response.status(200).json(result);
  }
}
