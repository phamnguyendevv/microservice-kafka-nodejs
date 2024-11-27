import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import rootRouter from "./routes";
import errorMiddleware from "./middlewares/error.middewares";
import bodyParser from "body-parser";
import { startService } from "./consumers/index";
import setupSocket from "./utils/socket/noti.socket";
import { createServer } from "http";

export const ExpressApp = async () => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(express.json());
  const server = createServer(app);
  console.log("serveris up ", typeof server);
  const io = setupSocket(server);

  //consumer
  await startService();

  app.use("/", rootRouter);

  app.use(errorMiddleware);
  // Bắt đầu server
  server.listen(4444, () => {
    console.log("Server đang chạy tại http://localhost:4444");
  });

  return server;
};
