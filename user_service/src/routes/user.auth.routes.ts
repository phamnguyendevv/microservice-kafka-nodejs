import { Router } from "express";
import {
  regiserUser,
  loginUser,
  getBlanceUser,
  getUserStatus,
  createUserStatus,
  updateUserStatus,
  deleteUserStatus,
  getUserRole,
  createUserRole,
  updateUserRole,
  deleteUserRole,
} from "../controllers/user.controllers";
import validate from "../utils/validate/validate";
import { valiRegister } from "../middlewares/user.auth.middlewares";
import { UserRole } from "../constants/statusRole";

const userRoutes = Router();

userRoutes.route("/register").post(validate(valiRegister), regiserUser);
userRoutes.route("/login").post(loginUser);

userRoutes.route("/:id/balance").get(getBlanceUser);

userRoutes
  .route("/admin/status")
  .post(createUserStatus)
  .put(updateUserStatus);

userRoutes.route("/admin/status/:id").get(getUserStatus);
userRoutes.route("/admin/status/:id").delete(deleteUserStatus);

userRoutes
  .route("/admin/role")
  .post(createUserRole)
  .put(updateUserRole)

userRoutes.route("/admin/role/:id").get(getUserRole);
userRoutes.route("/admin/role/:id").delete(deleteUserRole);

export default userRoutes;
