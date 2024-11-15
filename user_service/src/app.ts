import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import rootRouter from "./routes";
import client from "./redisClient"
export const ExpressApp = async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());


   app.use("/", rootRouter);


  return app;
};
