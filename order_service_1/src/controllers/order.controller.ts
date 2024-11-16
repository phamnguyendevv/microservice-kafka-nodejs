import { Request, Response, NextFunction } from "express";
import { ProducerBroker } from "../utils/broker/kafka/kafkaProducer";
import { OrderEvent } from "../types";
import clinet from "../redisClient";
import { v4 as uuidv4 } from "uuid";

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // create idempotent
    const idempotencyKey = String(req.headers["idempotency-key"]);
    const { amount, userId } = req.body;

    if (!idempotencyKey) {
      res.status(400).json({ error: "Idempotency key is required" });
      return;
    }

    if (!amount || !userId) {
      res.status(400).json({ error: "Amount and userId are required" });
      return;
    }

    try {
      // Kiểm tra nếu idempotency key đã tồn tại
      const cachedResult = await clinet.get(idempotencyKey);

      // if (cachedResult) {
      //   // Trả về kết quả nếu idempotency key đã tồn tại
      //   res.status(200).json(JSON.parse(cachedResult));
      //   return;
      // }
    } catch (error) {
      console.error("Get idempotency processing error:", error);
      res.status(500).json({ error: "Internal server error" });
    }

    // Tạo giao dịch mới
    const transaction = {
      idempotencyKey,
      paymentId: uuidv4(),
      userId,
      amount,
      status: "pending",
      retries: 0, // Thêm số lần thử lại
      timestamp: new Date(),
    };

    await clinet.setEx(idempotencyKey, 3600, JSON.stringify(transaction));

    // 3rd step: publish the message
    await ProducerBroker.publish({
      topic: "payment-transactions",
      headers: { token: "tolen" },
      event: OrderEvent.CREATE_ORDER,
      message: [{ value: JSON.stringify(transaction) }],
    });
    res.status(202).json({
      message: "Payment is being processed. Please check status later.",
    });
    return;
  } catch (error) {
    console.error("Payment processing error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
