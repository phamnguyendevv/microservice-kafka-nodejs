import { Router } from "express";
import {createCart } from "../controllers/cart.controllers"



const cartRoutes = Router();

cartRoutes
  .route("/")
  .post(createCart)



export default cartRoutes;
