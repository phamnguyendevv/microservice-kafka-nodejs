import { Router } from "express";
import { createOrder } from "../controllers/order.controller";

const orderRoutes = Router();

orderRoutes.route("/").post(createOrder);



export default orderRoutes;
