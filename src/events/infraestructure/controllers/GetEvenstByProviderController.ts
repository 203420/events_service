import { Request, Response } from "express";

import { GetEventsByProviderUseCase } from "../../application/GetEventsByProviderUseCase";

export class GetEventsByProviderController {
  constructor(readonly getEventsByProvider: GetEventsByProviderUseCase) {}

  async run(req: Request, res: Response) {
    const providerId = req.params.id;
    try {
      const response = await this.getEventsByProvider.run(Number(providerId));
      res.status(200).send(response);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
