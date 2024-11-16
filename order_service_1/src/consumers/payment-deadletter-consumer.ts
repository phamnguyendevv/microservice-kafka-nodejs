import { connectConsumer } from "../utils/broker/kafka/kafkaConsumer";
import { MessageType, OrderEvent, TOPIC_TYPE } from "../types";
import { Consumer } from "kafkajs";

export const handlePaymentDeadLetter = async (transaction: MessageType) => {
  console.log("Processing deal letter:", transaction);
};
