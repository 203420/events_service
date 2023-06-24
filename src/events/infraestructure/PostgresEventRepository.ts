import { pool } from "../../db";

import { Event } from "../domain/Event";
import { EventRepository } from "../domain/EventRepository";

export class PostgresEventRepository implements EventRepository {
  async createEvent(event: Event): Promise<Event | null> {
    const sql =
      "INSERT INTO events (name, description, date, categories, images, user_id, providers_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
    const values = [
      event.name,
      event.description,
      event.date,
      event.categories,
      event.images,
      event.userId,
      event.providersId,
    ];
    try {
      const result = await pool.query(sql, values);
      if (result.rows.length > 0) {
        const createdEventData = result.rows[0];
        const createdEvent: Event = {
          id: createdEventData.id,
          name: createdEventData.name,
          description: createdEventData.description,
          date: createdEventData.date,
          categories: createdEventData.categories,
          images: createdEventData.images,
          userId: createdEventData.user_id,
          providersId: createdEventData.providers_id,
        };
        return createdEvent;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async getById(id: number): Promise<Event | null> {
    const sql = "SELECT * FROM events WHERE id = $1";
    const values = [id];
    try {
      const result = await pool.query(sql, values);
      if (result.rows.length > 0) {
        const eventData = result.rows[0];
        const event: Event = {
          id: eventData.id,
          name: eventData.name,
          description: eventData.description,
          date: eventData.date,
          categories: eventData.categories,
          images: eventData.images,
          userId: eventData.userId,
          providersId: eventData.providersId,
        };
        return event;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async getListById(userId: number): Promise<Event[] | null> {
    const sql = "SELECT * FROM events where user_id = $1";
    const values = [userId];
    try {
      const result = await pool.query(sql, values);
      const events: Event[] = result.rows.map((eventData: any) => ({
        id: eventData.id,
          name: eventData.name,
          description: eventData.description,
          date: eventData.date,
          categories: eventData.categories,
          images: eventData.images,
          userId: eventData.user_id,
          providersId: eventData.providers_id,
      }));
      return events;
    } catch (error) {
      throw error;
    }
  }

  async deleteEvent(id: number): Promise<void> {
    const sql = "DELETE FROM events WHERE id = $1";
    const values = [id];
    try {
      await pool.query(sql, values);
    } catch (error) {
      throw error;
    }
  }
}
