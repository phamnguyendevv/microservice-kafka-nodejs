import { MessageType, OrderEvent, TOPIC_TYPE } from "../types";
import { ProducerBroker } from "../utils/broker/kafka/kafkaProducer";
import { checkBalance } from "../utils/user/checkBalance";

export const handlePaymentRetry = async (transaction: MessageType) => {
  try {
    console.log("Processing retry:", transaction);
    const balanceUser = await checkBalance(transaction);

    try {
      const transactions = JSON.parse(transaction.data[0].value);
      const isRetrySuccessful = null;

      if (isRetrySuccessful) {
        transactions.status = "success";

        // Publish success message to 'payment-success' topic
        await ProducerBroker.publish({
          topic: "payment-success",
          headers: { token: "token" },
          event: OrderEvent.CREATE_ORDER,
          message: [{ value: JSON.stringify(transactions) }],
        });

        console.log("Transaction succeeded:", transactions);
      } else {
        throw new Error("Payment failed");
      }
    } catch (error) {
      console.log("-----------------------------------------");
      const transactions = JSON.parse(transaction.data[0].value);
      console.log("Times retries", transactions.retries);
      console.error("Transaction failed: ", error);

      if (transactions.retries < 3) {
        transactions.retries += 1;

        // Publish retry message to 'payment-retry' topic
        await ProducerBroker.publish({
          topic: "payment-retry",
          headers: { token: "token" },
          event: OrderEvent.CREATE_ORDER,
          message: [{ value: JSON.stringify(transactions) }],
        });

        console.log(
          `Retrying transaction (${transactions.retries}/3):`,
          transactions
        );
      } else {
        transactions.status = "failed";

        // Publish dead-letter message to 'payment-deadletter' topic
        await ProducerBroker.publish({
          topic: "payment-deadletter",
          headers: { token: "token" },
          event: OrderEvent.CREATE_ORDER,
          message: [{ value: JSON.stringify(transactions) }],
        });

        console.error("Transaction moved to deadletter:", transactions);
      }
    }
  } catch (error) {
    console.error("Error consuming messages:", error);
    // Handle consumer connection or processing errors gracefully (e.g., retry logic)
  }
};
