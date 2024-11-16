import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import rootRouter from "./routes";
import errorMiddleware from "./middlewares/error.middewares";
import bodyParser from "body-parser";
import {startService} from "./consumers/index"

export const ExpressApp = async () => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(express.json());

  //consumer
  await startService();

  // // 2nd step: subscribe to the topic or publish the message
  // await ConsumerBroker.subscribe((message) => {
  //   console.log("Consumer received the message");
  //   console.log("Message received", message);
  // }, "OrderEvents");

  app.use("/", rootRouter);

  app.use(errorMiddleware);

  return app;
};
