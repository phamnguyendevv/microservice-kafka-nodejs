import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import rootRouter from "./routes";
import errorMiddleware from "./middlewares/error.middewares";
import { ConsumerBroker } from "./utils/broker/kafka/kafkaConsumer";
import { ProducerBroker } from "./utils/broker/kafka/kafkaProducer";

import { Consumer, Producer } from "kafkajs";
import bodyParser from "body-parser";

export const ExpressApp = async () => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(express.json());

  // // 1st step: connect to the producer and consumer
  const producer = await ProducerBroker.connectProducer<Producer>();

  const consumer = await ConsumerBroker.connectConsumer<Consumer>();
 



  // // 2nd step: subscribe to the topic or publish the message
  // await ConsumerBroker.subscribe((message) => {
  //   console.log("Consumer received the message");
  //   console.log("Message received", message);
  // }, "OrderEvents");

  app.use("/", rootRouter);

  app.use(errorMiddleware);

  return app;
};
