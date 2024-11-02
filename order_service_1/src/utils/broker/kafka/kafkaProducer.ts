// src/brokers/kafka/kafkaProducer.ts
import { kafka } from "./kafkaClient";
import { Partitioners, Producer } from "kafkajs";
import { PublishType } from "../broker.type";
import { createTopic } from "./kafkaAdmin";

let producer: Producer;

export const connectProducer = async (): Promise<Producer> => {
  await createTopic(["OrderEvents"]);

  if (producer) {
    console.log("Producer already connected");
    return producer;
  }

  producer = kafka.producer({
    createPartitioner: Partitioners.DefaultPartitioner,
  });
  await producer.connect();
  console.log("Producer connected");
  return producer;
};

export const disconnectProducer = async (): Promise<void> => {
  if (producer) {
    await producer.disconnect();
  }
};

export const publish = async (data: PublishType): Promise<boolean> => {
  const producer = await connectProducer();
  const result = await producer.send({
    topic: data.topic,
    messages: [
      {
        headers: data.headers,
        key: data.event,
        value: JSON.stringify(data.message),
      },
    ],
  });
  console.log("Publishing result", result);
  return result.length > 0;
};
