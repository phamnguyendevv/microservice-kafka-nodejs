import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cartRoutes from "./routes/cart.routes";
// import orderRoutes from "./routes/order.routes";
import { httpLogger, HandleErrorWithLogger } from "./utils";
// import { MessageBroker } from "./utils/broker";
// import { Consumer, Producer } from "kafkajs";

export const ExpressApp = async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(httpLogger);

  app.use(cartRoutes);

  app.use(HandleErrorWithLogger);

  return app;
};
