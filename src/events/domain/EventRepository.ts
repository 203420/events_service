import { Event } from "./Event";

export interface EventRepository {
  createEvent(event: Event): Promise<Event | null>;
  getById(id: number): Promise<Event | null>;
  getByProviderId(providerId: number): Promise<Event[] | null>;
  getListById(userId: number): Promise<Event[] | null>;
  deleteEvent(id: number): Promise<boolean | null>;
  updateEventProviders(
    id: number,
    providers: number[]
  ): Promise<boolean | null>;
}
