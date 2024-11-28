import { Consumer } from "kafkajs";
import { connectConsumer } from "../utils/broker/kafka/kafkaConsumer";
import { MessageType, OrderEvent } from "../types";
import { handlePaymentTransaction } from "./payment-consumer";
import { handlePaymentSuccess } from "./payment-success-consumer";
import { handlePaymentRetry } from "./payment-retry-consumer";
import { handlePaymentDeadLetter } from "./payment-deadletter-consumer";

export const startService = async () => {
  try {
    console.log("Starting payment service...");

    const consumer = await connectConsumer<Consumer>();

    // Subscribe to multiple topics
    await consumer.subscribe({
      topic: "payment-transactions",
      fromBeginning: true,
    });
    await consumer.subscribe({ topic: "payment-success", fromBeginning: true });
    await consumer.subscribe({ topic: "payment-retry", fromBeginning: true });
    await consumer.subscribe({
      topic: "payment-deadletter",
      fromBeginning: true,
    });

    // Run the consumer
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          if (!message.key || !message.value) {
            console.warn("Skipping message due to missing key or value:", {
              topic,
              partition,
            });
            return;
          }

          // Parse message key and value
          const event = message.key.toString() as OrderEvent;
          const data = JSON.parse(message.value.toString());

          // Construct the transaction object
          const transaction: MessageType = {
            headers: message.headers,
            event,
            data,
          };

          console.log(`Received message from topic ${topic}:`, transaction);

          // Handle logic based on the topic
          switch (topic) {
            case "payment-transactions":
              await handlePaymentTransaction(transaction);
              break;
            case "payment-success":
              await handlePaymentSuccess(transaction);
              break;
            case "payment-retry":
              await handlePaymentRetry(transaction);
              break;
            case "payment-deadletter":
              await handlePaymentDeadLetter(transaction);
              break;
            default:
              console.warn(`No handler defined for topic: ${topic}`);
          }
        } catch (error) {
          console.error(`Error processing message from topic ${topic}:`, error);
        }
      },
    });
    console.log("Consumer is running...");
  } catch (error) {
    console.error("Error starting payment service:", error);
  }
};
