import { EventRepository } from "../domain/EventRepository";

export class GetEventUseCase {
  constructor(readonly eventRepository: EventRepository) {}

  async run(id: number) {
    return await this.eventRepository.getById(id);
  }
}
