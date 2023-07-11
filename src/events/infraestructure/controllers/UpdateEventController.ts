import { Request, Response } from "express";

import { UpdateEventUseCase } from "../../application/UpdateEventUseCase";

export class UpdateEventController {
  constructor(readonly updateEventUseCase: UpdateEventUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    const id = req.params.id;

    try {
      const response = await this.updateEventUseCase.run(
        Number(id),
        data.providersId.map((i: any) => Number(i))
      );
      response === true
        ? res.status(200).send("Event updated succesfully")
        : res.status(404).send("This event does not exist");
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
