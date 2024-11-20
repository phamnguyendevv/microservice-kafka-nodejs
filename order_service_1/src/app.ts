import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import rootRouter from "./routes";
import errorMiddleware from "./middlewares/error.middewares";
import bodyParser from "body-parser";
import { startService } from "./consumers/index";
import setupSocket from "./utils/socket/noti.socket";
import { createServer } from "http";

export const ExpressApp = async () => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(express.json());
  const server = createServer(app);
  //consumer
  await startService();

  app.use("/", rootRouter);

  app.use(errorMiddleware);

  const io = setupSocket(server);

  return app;
};
