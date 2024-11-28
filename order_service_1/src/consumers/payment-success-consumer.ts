import { MessageType, OrderEvent } from "../types";
import { getSocketInstance } from "../utils/socket/noti.socket";

export const handlePaymentSuccess = async (transaction: MessageType) => {
  try {
    console.log("Handling payment success:");
    const io = getSocketInstance();

    // Emit sự kiện tới tất cả client
    io.emit("paymentSuccess", {
      message: "Payment successful!",
      transaction,
    });
    console.log("Payment success event emitted to clients.");
  } catch (error) {
    console.error("Error handling payment success:", error);
  }
};
