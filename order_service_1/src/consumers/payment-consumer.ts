import { MessageType, OrderEvent } from "../types";
import { ProducerBroker } from "../utils/broker/kafka/kafkaProducer";

// Function to handle individual payment transactions
export const handlePaymentTransaction = async (transaction: MessageType) => {
  try {
    console.log("Handling payment transaction:", transaction);

    // Simulate payment processing (70% success rate)
    const isPaymentSuccessful = null;

    if (isPaymentSuccessful) {
      transaction.data.status = "success";

      // Publish success message to 'payment-success' topic
      await ProducerBroker.publish({
        topic: "payment-success",
        headers: { token: "token" },
        event: OrderEvent.CREATE_ORDER,
        message: [{ value: JSON.stringify(transaction) }],
      });
      console.log("Payment succeeded:", transaction);
    } else {
      throw new Error("Payment failed wait 1p");
    }
  } catch (error) {
    console.error("Transaction processing failed:", transaction, error);

    // Retry logic
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
      console.error("Transaction moved to dead-letter:", transaction);
    }
  }
};
