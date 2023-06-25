import { Event } from "../domain/Event";
import { EventRepository } from "../domain/EventRepository";

export class CreateEventUseCase {
  constructor(readonly eventRepository: EventRepository) {}

  async run(event: Event) {
    return await this.eventRepository.createEvent(event);
  }
}
