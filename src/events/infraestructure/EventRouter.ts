import express from "express";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/../../../uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

import {
  createEventController,
  deleteEventController,
  getEventController,
  getEventsByProviderController,
  getEventsListController,
  updateEventController,
} from "./dependencies";

export const eventRouter = express.Router();

eventRouter.post(
  "/",
  upload.any(),
  createEventController.run.bind(createEventController)
);

eventRouter.delete(
  "/:id",
  deleteEventController.run.bind(deleteEventController)
);
eventRouter.put(
  "/:id",
  upload.any(),
  updateEventController.run.bind(updateEventController)
);

eventRouter.get("/:id", getEventController.run.bind(getEventController));
eventRouter.get(
  "/provider/:id",
  getEventsByProviderController.run.bind(getEventsByProviderController)
);

eventRouter.get(
  "/list/:id",
  getEventsListController.run.bind(getEventsListController)
);
