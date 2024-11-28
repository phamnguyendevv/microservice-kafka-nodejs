import { Router } from "express";
import userRoute from "./user.auth.routes";


const rootRouter = Router();

rootRouter.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express!");
});

rootRouter.use("/user", userRoute);

export default rootRouter;
