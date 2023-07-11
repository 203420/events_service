import { Request, Response } from "express";

import { GetEventsListUseCase } from "../../application/GetEventsList";

export class GetEventListController {
  constructor(readonly getEventsListUseCase: GetEventsListUseCase) {}

  async run(req: Request, res: Response) {
    const userId = req.params.id;
    try {
      const response = await this.getEventsListUseCase.run(Number(userId));

      res.status(200).send(response);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
