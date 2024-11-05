import { Router } from "express";
import {
  createCart,
  getCart,
  addItemToCart,
} from "../controllers/cart.controllers";

const cartRoutes = Router();

cartRoutes
  .route("/")
  .post(createCart)
  .get(getCart);

cartRoutes
  .route("/addItemToCart")
  .post(addItemToCart)
  .get(getCart);

export default cartRoutes;
