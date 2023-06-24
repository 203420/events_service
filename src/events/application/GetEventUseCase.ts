import { EventRepository } from "../domain/EventRepository";

export class GetEventUseCase {
    constructor(readonly eventRepository: EventRepository) {}

    async run(id: number) {
       const event =  await this.eventRepository.getById(id);
       return event;
    }
}