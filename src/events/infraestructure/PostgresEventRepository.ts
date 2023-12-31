import * as fs from "fs";

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
        const providers = createdEventData.providers_id.map((i: any) =>
          Number(i)
        );
        const createdEvent: Event = {
          id: createdEventData.id,
          name: createdEventData.name,
          description: createdEventData.description,
          date: createdEventData.date,
          categories: createdEventData.categories,
          images: createdEventData.images,
          userId: Number(createdEventData.user_id),
          providersId: providers,
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
        const providers = eventData.providers_id.map((i: any) => Number(i));
        const event: Event = {
          id: eventData.id,
          name: eventData.name,
          description: eventData.description,
          date: eventData.date,
          categories: eventData.categories,
          images: eventData.images,
          userId: Number(eventData.user_id),
          providersId: providers,
        };
        return event;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async getByProviderId(providerId: number): Promise<Event[] | null> {
    const sql = "SELECT * FROM events WHERE $1 = ANY (providers_id)";
    const values = [providerId];
    try {
      const result = await pool.query(sql, values);
      const events: Event[] = result.rows.map((eventData: any) => ({
        id: eventData.id,
        name: eventData.name,
        description: eventData.description,
        date: eventData.date,
        categories: eventData.categories,
        images: eventData.images,
        userId: Number(eventData.user_id),
        providersId: eventData.providers_id.map((i: any) => Number(i)),
      }));
      return events;
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
        userId: Number(eventData.user_id),
        providersId: eventData.providers_id.map((i: any) => Number(i)),
      }));
      return events;
    } catch (error) {
      throw error;
    }
  }

  async deleteEvent(id: number): Promise<boolean | null> {
    const sql = "DELETE FROM events WHERE id = $1 returning *";
    const values = [id];
    try {
      const result = await pool.query(sql, values);
      const rowsAffected = result.rowCount;
      console.log(result.rows[0].images);

      if (result.rows[0].images.length > 0) {
        await Promise.all(
          result.rows[0].images.map((path: any) =>
            fs.promises.unlink(path.replace("/images-events", "uploads"))
          )
        );
      }

      return rowsAffected > 0 ? true : false;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateEventProviders(
    id: number,
    providers: number[]
  ): Promise<boolean | null> {
    const sql = "UPDATE events SET providers_id = $1 WHERE id = $2";
    const values = [providers, id];
    try {
      const result = await pool.query(sql, values);
      console.log(result);
      const rowsAffected = result.rowCount;

      return rowsAffected > 0 ? true : false;
    } catch (error) {
      throw error;
    }
  }
}
