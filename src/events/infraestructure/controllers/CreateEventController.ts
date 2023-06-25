import { Request, Response } from "express";

import { CreateEventUseCase } from "../../application/CreateEventUseCase";
import { Event } from "../../domain/Event";

export class CreateEventController {
  constructor(readonly createEventUseCase: CreateEventUseCase) {}

  async run(req: Request, res: Response) {
    const imgPaths = [];
    const providers = [];
    const formData = req.body;
    const files: Express.Multer.File[] = req.files as Express.Multer.File[];
    try {
      for (let i = 0; i < files.length; i++) {
        imgPaths.push(`/uploads/${files[i].filename}`);
      }

      for (let i = 0; i < formData.providersId.length; i++) {
        providers.push(Number(formData.providersId[i]));
      }

      console.log(formData.providersId);

      const eventData = await this.createEventUseCase.run(
        new Event(
          formData.id,
          formData.name,
          formData.description,
          formData.date,
          formData.categories,
          imgPaths,
          Number(formData.userId),
          providers
        )
      );
      res.status(200).json(eventData);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
}
