import { Request, Response } from "express";

export class UploadArchiveController {
  async handle(request: Request, response: Response): Promise<Response> {
    return response.status(200).send();
  }
}
