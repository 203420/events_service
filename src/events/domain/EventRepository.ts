import { Event } from "./Event";

export interface EventRepository {
    createEvent(event: Event): Promise<Event | null>;
    getById(id: number): Promise<Event | null>;
    getListById(userId: number): Promise<Event[] | null>;
    deleteEvent(id: number): Promise<void>;
}