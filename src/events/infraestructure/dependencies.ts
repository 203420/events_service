import { CreateEventUseCase } from "../application/CreateEventUseCase";
import { CreateEventController } from "./controllers/CreateEventController";
import { DeleteEventUseCase } from "../application/DeleteEventUseCase";
import { DeleteEventController } from "./controllers/DeleteEventController";
import { GetEventUseCase } from "../application/GetEventUseCase";
import { GetEventController } from "./controllers/GetEventController";
import { GetEventsListUseCase } from "../application/GetEventsList";
import { GetEventListController } from "./controllers/GetEventsListController";

import { PostgresEventRepository } from "./PostgresEventRepository";

const postgresEventRepository = new PostgresEventRepository();

export const createEventUseCase = new CreateEventUseCase(postgresEventRepository);
export const createEventController = new CreateEventController(createEventUseCase);

export const deleteEventUseCase = new DeleteEventUseCase(postgresEventRepository);
export const deleteEventController = new DeleteEventController(deleteEventUseCase);

export const getEventUseCase = new GetEventUseCase(postgresEventRepository);
export const getEventController = new GetEventController(getEventUseCase);

export const getEvenstListUseCase = new GetEventsListUseCase(postgresEventRepository);
export const getEventsListController = new GetEventListController(getEvenstListUseCase);