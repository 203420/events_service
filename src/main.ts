import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

import bodyParser from "body-parser";
import express from "express";
import path from "path";

import { config } from "./config";
import { eventRouter } from "./events/infraestructure/EventRouter";

const currentDir = __dirname;
const parentDir = path.dirname(currentDir);

function boostrap() {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  
  app.use('/events', eventRouter);
  app.get('/uploads/:filename', (req, res) => {
    const filename = req.params.filename;
    const imagePath = path.join(parentDir, 'images', filename);
    res.sendFile(imagePath);
  });
  
  const { port } = config.server;

  app.listen(port, () => {
    console.log(`[APP] - Starting application on port ${port}`);
  });
}


boostrap();
