import { connectConsumer } from "../utils/broker/kafka/kafkaConsumer";
import { MessageType, OrderEvent, TOPIC_TYPE } from "../types";
import { Consumer } from "kafkajs";
import { ProducerBroker } from "../utils/broker/kafka/kafkaProducer";

export const consumeTransactions = async (
 ): Promise<void> => {
   try {
     // Connect to the consumer
     const consumer = await connectConsumer<Consumer>();

     // Subscribe to the specified topic with fromBeginning for full processing
     await consumer.subscribe({
       topic: "payment-transactions",
       fromBeginning: true,
     });
     console.log(" paymen is here")
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
         const data = message.value
           ? JSON.parse(message.value.toString())
           : null;

         // Construct transaction object
         const transaction: MessageType = {
           headers: message.headers,
           event,
           data,
         };

         console.log("Processing transaction:", transaction);
         try {
           // Call the message handler

           // Simulate payment processing
           const isPaymentSuccessful = Math.random() > 0.3; // 70% success rate

           if (isPaymentSuccessful) {
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
           console.error("Transaction failed:", transaction, error);

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
       },
     });
   } catch (error) {
     console.error("Error consuming messages:", error);
     // Handle consumer connection or processing errors gracefully (e.g., retry logic)
   }
 };


consumeTransactions().catch(console.error);