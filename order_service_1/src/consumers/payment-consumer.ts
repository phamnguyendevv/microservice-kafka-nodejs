import { CHECK_BALANCE_URL } from "../config";
import { MessageType, OrderEvent } from "../types";
import { ConsumerBroker } from "../utils/broker/kafka/kafkaConsumer";
import { ProducerBroker } from "../utils/broker/kafka/kafkaProducer";
import { v4 as uuidv4 } from "uuid"; // For unique correlation IDs
import { checkBalance } from "../utils/user/checkBalance";

// Function to handle individual payment transactions
export const handlePaymentTransaction = async (transaction: MessageType) => {
  try {
    console.log("Handling payment transaction:", transaction);

    // Check user balance
    const balanceUser = await checkBalance(transaction);
    
    if(balanceUser == false){
      console.log("User balance is insufficient");
      throw new Error("User balance is insufficient");
    }
    console.log("User balance is sufficient");

    // Simulate payment processing (70% success rate)
    const isPaymentSuccessful = balanceUser;

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
    const transactions = JSON.parse(transaction.data[0].value);
    // Retry logic
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
        transaction
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
      console.error("Transaction moved to dead-letter:", transaction);
    }
  }
};
