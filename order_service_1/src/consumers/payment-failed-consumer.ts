import { MessageType } from "../types";
import { getSocketInstance } from "../utils/socket/noti.socket";

export const handlePaymentSuccess = async (transaction: MessageType) => {
  try {
    console.log("Handling payment failed:");
    const io = getSocketInstance();

    // Emit sự kiện tới tất cả client
    io.emit("paymentFailed", {
      message: "Payment failed!",
      transaction,
    });
    console.log("Payment failed event emitted to clients.");
  } catch (error) {
    console.error("Error handling payment failed:", error);
  }
};
