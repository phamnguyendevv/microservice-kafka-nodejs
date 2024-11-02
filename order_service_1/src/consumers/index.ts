// src/consumers/exampleConsumer.ts
import { CLIENT_ID, BROKERS, GROUP_ID } from "../config/index";
import { Consumer, Kafka, logLevel, Partitioners, Producer } from "kafkajs";
// Cấu hình Kafka
const kafka = new Kafka({
  clientId: CLIENT_ID,
  brokers: BROKERS,
});

let consumer: Consumer;

export const connectConsumer = async <T>(): Promise<T> => {
  if (consumer) {
    return consumer as unknown as T;
  }

  consumer = kafka.consumer({
    groupId: GROUP_ID,
  });

  await consumer.connect();
  return consumer as unknown as T;
};

const disconnectConsumer = async (): Promise<void> => {
  if (consumer) {
    await consumer.disconnect();
  }
};
