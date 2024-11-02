// src/brokers/kafka/kafkaConsumer.ts
import { kafka } from "./kafkaClient";
import { Consumer } from "kafkajs";
import { MessageHandler } from "../broker.type";
import { OrderEvent, TOPIC_TYPE } from "../../../types";

let consumer: Consumer;

export const connectConsumer = async (): Promise<Consumer> => {
  if (consumer) {
    console.log("Consumer already connected");
    return consumer;
  }

  consumer = kafka.consumer({
    groupId: process.env.GROUP_ID || "order-service-group",
  });
  await consumer.connect();
  return consumer;
};

export const disconnectConsumer = async (): Promise<void> => {
  if (consumer) {
    await consumer.disconnect();
  }
};

export const subscribe = async (
  messageHandler: MessageHandler,
  topic: TOPIC_TYPE
): Promise<void> => {
  const consumer = await connectConsumer();
  await consumer.subscribe({ topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (message.key && message.value) {
        const inputMessage = {
          headers: message.headers,
          event: message.key.toString() as OrderEvent,
          data: JSON.parse(message.value.toString()),
        };
        await messageHandler(inputMessage);
        await consumer.commitOffsets([
          { topic, partition, offset: (Number(message.offset) + 1).toString() },
        ]);
      }
    },
  });
};
