import { EventRepository } from "../domain/EventRepository";

export class UpdateEventUseCase {
  constructor(readonly eventRepository: EventRepository) {}

  async run(id: number, providers: number[]) {
    return await this.eventRepository.updateEventProviders(id, providers);
  }
}
