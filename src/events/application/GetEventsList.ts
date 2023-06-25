import { EventRepository } from "../domain/EventRepository";

export class GetEventsListUseCase {
  constructor(readonly eventRepository: EventRepository) {}

  async run(userId: number) {
    return await this.eventRepository.getListById(userId);
  }
}
