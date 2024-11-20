import { Router } from "express";
import {
  regiserUser,
  loginUser,
  getBlanceUser,
} from "../controllers/user.controllers";

const userRoutes = Router();

userRoutes.route("/register").post(regiserUser);
userRoutes.route("/login").post(loginUser);

userRoutes.route("/:id/balance").get(getBlanceUser);

export default userRoutes;
