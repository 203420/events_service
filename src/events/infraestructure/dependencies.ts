import { CreateEventUseCase } from "../application/CreateEventUseCase";
import { DeleteEventUseCase } from "../application/DeleteEventUseCase";
import { GetEventsByProviderUseCase } from "../application/GetEventsByProviderUseCase";
import { GetEventsListUseCase } from "../application/GetEventsList";
import { GetEventUseCase } from "../application/GetEventUseCase";
import { UpdateEventUseCase } from "../application/UpdateEventUseCase";
import { CreateEventController } from "./controllers/CreateEventController";
import { DeleteEventController } from "./controllers/DeleteEventController";
import { GetEventsByProviderController } from "./controllers/GetEvenstByProviderController";
import { GetEventController } from "./controllers/GetEventController";
import { GetEventListController } from "./controllers/GetEventsListController";
import { UpdateEventController } from "./controllers/UpdateEventController";
import { PostgresEventRepository } from "./PostgresEventRepository";

const postgresEventRepository = new PostgresEventRepository();

export const createEventUseCase = new CreateEventUseCase(
  postgresEventRepository
);
export const createEventController = new CreateEventController(
  createEventUseCase
);

export const deleteEventUseCase = new DeleteEventUseCase(
  postgresEventRepository
);
export const deleteEventController = new DeleteEventController(
  deleteEventUseCase
);

export const getEventUseCase = new GetEventUseCase(postgresEventRepository);
export const getEventController = new GetEventController(getEventUseCase);

export const getEvenstListUseCase = new GetEventsListUseCase(
  postgresEventRepository
);
export const getEventsListController = new GetEventListController(
  getEvenstListUseCase
);

export const getEventsByProviderUseCase = new GetEventsByProviderUseCase(
  postgresEventRepository
);
export const getEventsByProviderController = new GetEventsByProviderController(
  getEventsByProviderUseCase
);

export const updateEventUseCase = new UpdateEventUseCase(
  postgresEventRepository
);
export const updateEventController = new UpdateEventController(
  updateEventUseCase
);
