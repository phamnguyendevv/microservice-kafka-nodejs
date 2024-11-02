import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import rootRouter from "./routes";
import errorMiddleware from "./middlewares/error.middewares"; 
import { connectConsumer, subscribe  } from "./utils/broker/kafka/kafkaConsumer";
import { connectProducer } from "./utils/broker/kafka/kafkaProducer";
export const ExpressApp = async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  // 1st step: connect to the producer and consumer
  await connectConsumer();
  await connectProducer();

  // 2nd step: subscribe to the topic or publish the message
  subscribe

  app.use("/", rootRouter);

  app.use(errorMiddleware);

  return app;
};
