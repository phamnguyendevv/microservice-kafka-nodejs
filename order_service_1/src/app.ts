import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import rootRouter from "./routes";
import errorMiddleware from "./middlewares/error.middewares";
import { ConsumerBroker } from "./utils/broker/kafka/kafkaConsumer";
import { ProducerBroker } from "./utils/broker/kafka/kafkaProducer";
import { Consumer, Producer } from "kafkajs";
export const ExpressApp = async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  // 1st step: connect to the producer and consumer
  const producer = await ProducerBroker.connectProducer<Producer>();
  producer.on("producer.connect", () => {
    console.log("producer connected");
  });

  const consumer = await ConsumerBroker.connectConsumer<Consumer>();
  consumer.on("consumer.connect", () => {
    console.log("consumer connected");
  });

  // 2nd step: subscribe to the topic or publish the message
  await ConsumerBroker.subscribe((message) => {
    console.log("Consumer received the message");
    console.log("Message received", message);
  }, "OrderEvents");

  app.use("/", rootRouter);

  app.use(errorMiddleware);

  return app;
};
