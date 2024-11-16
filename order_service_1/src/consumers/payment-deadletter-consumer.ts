import { connectConsumer } from "../utils/broker/kafka/kafkaConsumer";
import { MessageType, OrderEvent, TOPIC_TYPE } from "../types";
import { MessageHandler } from "../utils/broker/broker.type";
import { Consumer } from "kafkajs";
import { ProducerBroker } from "../utils/broker/kafka/kafkaProducer";

const consumeDeadLetterMessages = async (): Promise<void> => {
  // Connect to the consumer
  const consumer = await connectConsumer<Consumer>();

  // Subscribe to the specified topic with fromBeginning for full processing
  await consumer.subscribe({
    topic: "payment-deadletter",
    fromBeginning: true,
  });

  // Run the consumer, processing each message
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (!message.key || !message.value) {
        console.warn("Skipping message due to missing key or value:", {
          topic,
          partition,
        });
        return; // Skip messages without key or value
      }

      // Parse message key and value
      const event = message.key.toString() as OrderEvent; // Assuming key represents event
      const data = message.value ? JSON.parse(message.value.toString()) : null;

      // Construct transaction object
      const transaction: MessageType = {
        headers: message.headers,
        event,
        data,
      };

      console.log("Processing transaction:", transaction);
    },
  });
};
consumeDeadLetterMessages().catch(console.error);
