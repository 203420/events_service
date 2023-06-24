import { EventRepository } from "../domain/EventRepository";

export class GetEventsListUseCase {
    constructor(readonly eventRepository: EventRepository) {}

    async run(userId: number) {
       const events =  await this.eventRepository.getListById(userId);
       return events;
    }
}