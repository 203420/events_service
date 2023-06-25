import { Request, Response } from "express";

import { GetEventUseCase } from "../../application/GetEventUseCase";

export class GetEventController {
  constructor(readonly getEventUseCase: GetEventUseCase) {}

  async run(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const response = await this.getEventUseCase.run(Number(id));
      res.status(200).send(response);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
