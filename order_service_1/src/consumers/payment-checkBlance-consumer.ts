// ConsumerBroker.subscribe(userBalanceTopic, async (message) => {
  
// });


// export const handlePaymentDeadLetter = async (transaction: MessageType) => {
//     console.log("Processing deal letter:", transaction);
//     const response = JSON.parse(message.value.toString());

//     // Match the correlation ID
//     if (response.correlationId === correlationId) {
//       clearTimeout(timeout); // Clear timeout once the response is received
//       ConsumerBroker.unsubscribe(userBalanceTopic); // Unsubscribe to avoid duplicate listeners
//       resolve(response.isBalanceSufficient);
//     }
// };
