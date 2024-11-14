import { Request, Response, NextFunction } from "express";
import { ProducerBroker } from "../utils/broker/kafka/kafkaProducer";
import { OrderEvent } from "../types";

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // 3rd step: publish the message
    await ProducerBroker.publish({
      topic: "OrderEvents",
      headers: { token: "tolen" },
      event: OrderEvent.CREATE_ORDER,
      message: {
        orderId: 1,
        items: [
          {
            productId: 1,
            quantity: 1,
          },
          {
            productId: 2,
            quantity: 2,
          },
        ],
      },
    });
  } catch (error) {
    console.error("Error during createCart:", error);
    next(error);
  }
};
