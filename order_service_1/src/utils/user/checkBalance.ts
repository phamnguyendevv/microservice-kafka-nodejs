import axios from "axios";
import { CHECK_BALANCE_URL } from "../../config";
import { MessageType } from "../../types";

export const checkBalance = async (transaction: MessageType) => {
  const transactions = JSON.parse(transaction.data[0].value);
  const userId = transactions.userId; // Assuming user ID is pre.sent in the transaction data
  const userServiceUrl = CHECK_BALANCE_URL + userId + "/balance"; // Assuming user service URL
  console.log("userServiceUrl", userServiceUrl);

  try {
    const response = await axios.get(userServiceUrl);
    console.log("response", response);

    const userBalance = response.data.data.balance;
    const requiredAmount = transactions.amount;
    console.log("User balance:", userBalance);
    console.log("Required amount:", requiredAmount);
    if (userBalance >= requiredAmount) {
      return true; // Balance is sufficient
    } else {
      return false; // Balance is insufficient
    }
  } catch (error) {
    console.error("Error fetching user balance:", error);
    throw new Error("Failed to fetch user balance");
  }
};
