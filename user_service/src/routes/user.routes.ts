import { Router } from "express";
import {
  regiserUser,

} from "../controllers/user.controllers";

const cartRoutes = Router();

cartRoutes.route("/").post(regiserUser)


export default cartRoutes;
