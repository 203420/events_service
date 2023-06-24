import { Request, Response } from "express";

import { DeleteEventUseCase } from "../../application/DeleteEventUseCase";

export class DeleteEventController {
    constructor(readonly deleteEventUseCase: DeleteEventUseCase) {}

    async run(req: Request, res: Response) {
        const id = req.params.id;
        try {
            await this.deleteEventUseCase.run(Number(id));
            res.status(200).send("Event deleted successfully");
        } catch (error) {
            res.status(500).send(error);
        }
    }
}