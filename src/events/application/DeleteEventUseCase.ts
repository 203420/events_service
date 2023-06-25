import { EventRepository } from "../domain/EventRepository";

export class DeleteEventUseCase {
  constructor(readonly eventRepository: EventRepository) {}

  async run(id: number) {
    return await this.eventRepository.deleteEvent(id);
  }
}
