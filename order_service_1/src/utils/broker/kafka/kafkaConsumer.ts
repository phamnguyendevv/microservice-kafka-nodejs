// src/brokers/kafka/kafkaConsumer.ts
import { kafka } from "./kafkaClient";
import { Consumer } from "kafkajs";
import { ConsumerType, MessageHandler } from "../broker.type";
import { MessageType, OrderEvent, TOPIC_TYPE } from "../../../types";

let consumer: Consumer;

export const connectConsumer = async <T>(): Promise<T> => {
  try {
    if (consumer) {
      console.log("Consumer already connected");
      return consumer as unknown as T;
    }

    consumer = kafka.consumer({
      groupId: process.env.GROUP_ID || "order-service-group",
    });
    await consumer.connect();
     console.log("Consumer connected");
    return consumer as unknown as T;
  } catch (error) {
    console.error("Error connecting consumer:", error);
    throw error; // Hoặc xử lý lỗi tùy theo nhu cầu
  }
};

const disconnectConsumer = async (): Promise<void> => {
  if (consumer) {
    await consumer.disconnect();
  }
};

const subscribe = async (
  messageHandler: MessageHandler,
  topic: TOPIC_TYPE
): Promise<void> => {
  const consumer = await connectConsumer<Consumer>();
  await consumer.subscribe({ topic: topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (topic !== "OrderEvents") {
        return;
      }

      if (message.key && message.value) {
        const inputMessage: MessageType = {
          headers: message.headers,
          event: message.key.toString() as OrderEvent,
          data: message.value ? JSON.parse(message.value.toString()) : null,
        };
        await messageHandler(inputMessage);
        await consumer.commitOffsets([
          { topic, partition, offset: (Number(message.offset) + 1).toString() },
        ]);
      }
    },
  });
};

export const ConsumerBroker: ConsumerType = {
  connectConsumer,
  disconnectConsumer,
  subscribe,
};
