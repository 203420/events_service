import { EventRepository } from "../domain/EventRepository";

export class GetEventsByProviderUseCase {
  constructor(readonly eventRepository: EventRepository) {}

  async run(providerId: number) {
    return await this.eventRepository.getByProviderId(providerId);
  }
}
