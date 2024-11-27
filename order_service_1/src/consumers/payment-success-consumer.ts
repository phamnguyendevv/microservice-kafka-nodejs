
import { MessageType, OrderEvent } from "../types";



// Function to handle individual payment transactions
export const handlePaymentSuccess = async (transaction: MessageType) => {
  // try {
    console.log("Handling payment success:");

  //   // Gửi thông báo đến user qua Socket.IO
  //   const userId = transaction.data.userId;
  //   const userSocketId = onlineUsers.get(userId);

  //   if (userSocketId) {
  //     io.to(userSocketId).emit("paymentSuccess", {
  //       message: "Payment was successful!",
  //       transactionId: transaction.data.id,
  //       amount: transaction.data.amount,
  //     });
  //     console.log(`Notification sent to user: ${userId}`);
  //   } else {
  //     console.log(`User ${userId} is not online.`);
  //   }
  //   console.log("Payment succeeded:");
  // } catch (error) {
  //   console.log(error);
  // }
};
