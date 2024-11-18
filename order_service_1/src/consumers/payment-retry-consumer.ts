import { MessageType, OrderEvent, TOPIC_TYPE } from "../types";
import { ProducerBroker } from "../utils/broker/kafka/kafkaProducer";

export const handlePaymentRetry = async (transaction: MessageType) => {
  try {
    console.log("Processing retryyyyyyyy:", transaction);
    try {
      const isRetrySuccessful = null;

      if (isRetrySuccessful) {
        transaction.data.status = "success";

        // Publish success message to 'payment-success' topic
        await ProducerBroker.publish({
          topic: "payment-success",
          headers: { token: "token" },
          event: OrderEvent.CREATE_ORDER,
          message: [{ value: JSON.stringify(transaction) }],
        });

        console.log("Transaction succeeded:", transaction);
      } else {
        throw new Error("Payment failed");
      }
    } catch (error) {
      console.log("-----------------------------------------");
      console.log("Times retries", transaction.data.retries);
      console.error("Transaction failed: ", error);

      if (transaction.data.retries < 3) {
        transaction.data.retries += 1;

        // Publish retry message to 'payment-retry' topic
        await ProducerBroker.publish({
          topic: "payment-retry",
          headers: { token: "token" },
          event: OrderEvent.CREATE_ORDER,
          message: [{ value: JSON.stringify(transaction) }],
        });

        console.log(
          `Retrying transaction (${transaction.data.retries}/3):`,
          transaction
        );
      } else {
        transaction.data.status = "failed";

        // Publish dead-letter message to 'payment-deadletter' topic
        await ProducerBroker.publish({
          topic: "payment-deadletter",
          headers: { token: "token" },
          event: OrderEvent.CREATE_ORDER,
          message: [{ value: JSON.stringify(transaction) }],
        });

        console.error("Transaction moved to deadletter:", transaction);
      }
    }
  } catch (error) {
    console.error("Error consuming messages:", error);
    // Handle consumer connection or processing errors gracefully (e.g., retry logic)
  }
};
