import { Router } from "express";
import { regiserUser, getBlanceUser } from "../controllers/user.controllers";

const cartRoutes = Router();

cartRoutes.route("/").post(regiserUser);
cartRoutes.route("/balance/:id").get(getBlanceUser);

export default cartRoutes;
