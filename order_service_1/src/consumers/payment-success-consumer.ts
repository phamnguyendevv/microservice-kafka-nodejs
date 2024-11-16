import { MessageType, OrderEvent } from "../types";
import { ProducerBroker } from "../utils/broker/kafka/kafkaProducer";

// Function to handle individual payment transactions
export const handlePaymentSuccess = async (transaction: MessageType) => {
  try {
    console.log("Handling payment success:");
    console.log("Payment succeeded:");
  } catch (error) {
    console.log(error);
  }
};
