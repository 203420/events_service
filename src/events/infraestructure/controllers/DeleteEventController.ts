import { Request, Response } from "express";

import { DeleteEventUseCase } from "../../application/DeleteEventUseCase";

export class DeleteEventController {
  constructor(readonly deleteEventUseCase: DeleteEventUseCase) {}

  async run(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const response = await this.deleteEventUseCase.run(Number(id));
      response == true
        ? res.status(200).send("Event deleted successfully")
        : res.status(500).send("Error deleting event");
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
