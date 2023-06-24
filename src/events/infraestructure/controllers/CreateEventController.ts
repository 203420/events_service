import { Request, Response } from "express";

import { Event } from "../../domain/Event";
import { CreateEventUseCase } from "../../application/CreateEventUseCase";

export class CreateEventController {
  constructor(readonly createEventUseCase: CreateEventUseCase) {}

  async run(req: Request, res: Response) {
    let imgPaths = []
    const formData = req.body;
    const files: Express.Multer.File[] = req.files as Express.Multer.File[];
    try {
      for(let i = 0 ; i < files.length ; i++) {
        imgPaths.push(`/uploads/${files[i].filename}`)
      }

      const eventData = await this.createEventUseCase.run(
        new Event(
          formData.id,
          formData.name,
          formData.description,
          formData.date,
          formData.categories,
          imgPaths,
          formData.userId,
          formData.providersId
        )
      );
      res.status(200).json(eventData);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
