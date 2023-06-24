
import { EventRepository } from "../domain/EventRepository";

export class DeleteEventUseCase {
    constructor(readonly eventRepository: EventRepository) {}

    async run(id: number) {
        await this.eventRepository.deleteEvent(id);
    }
}