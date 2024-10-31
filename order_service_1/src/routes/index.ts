import { Router } from "express";
import cartRoute from "./cart.routes";

const rootRouter = Router();

rootRouter.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express!");
});

rootRouter.use("/cart", cartRoute);

export default rootRouter;
