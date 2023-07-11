import { Request, Response } from "express";

import { CreateEventUseCase } from "../../application/CreateEventUseCase";
import { Event } from "../../domain/Event";

export class CreateEventController {
  constructor(readonly createEventUseCase: CreateEventUseCase) {}

  async run(req: Request, res: Response) {
    const imgPaths = [];
    const providers = [];
    let categories = [];
    const formData = req.body;
    const files: Express.Multer.File[] = req.files as Express.Multer.File[];
    try {
      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          imgPaths.push(`/images-events/${files[i].filename}`);
        }
      }
      if (formData.providersId != null) {
        for (let i = 0; i < formData.providersId.length; i++) {
          providers.push(Number(formData.providersId[i]));
        }
      }
      if (formData.categories != null) {
        if (typeof formData.categories === "string") {
          categories.push(formData.categories);
        } else {
          categories = formData.categories;
        }
      }

      const eventData = await this.createEventUseCase.run(
        new Event(
          formData.id,
          formData.name,
          formData.description,
          formData.date,
          categories,
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
