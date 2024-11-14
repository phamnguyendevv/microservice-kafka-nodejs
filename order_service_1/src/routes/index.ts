import { Router } from "express";
import cartRoute from "./cart.routes";
import orderRoutes from "./order.routes";

const rootRouter = Router();

rootRouter.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express!");
});

rootRouter.use("/cart", cartRoute);
rootRouter.use("/order", orderRoutes);


export default rootRouter;
