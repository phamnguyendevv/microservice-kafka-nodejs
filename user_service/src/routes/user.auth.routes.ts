import { Router } from "express";
import {
  regiserUser,
  loginUser,
  refreshToken,
  forgotPassword,
  resetPassword,
  changePassword,
  getUser,
  updateUser,
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
import {
  valiRegister,
  valiLogin,
  valiForgot,
} from "../middlewares/user.auth.middlewares";
import { UserRole } from "../constants/statusRole";

const userRoutes = Router();

userRoutes.route("/register").post(validate(valiRegister), regiserUser);
userRoutes.route("/login").post(validate(valiLogin), loginUser);
userRoutes.route("/token").post(refreshToken);
userRoutes.route("/password/forgot").post(validate(valiForgot), forgotPassword);
userRoutes.route("/password/reset").post(resetPassword);
userRoutes.route("/password/update").post(changePassword);
userRoutes.route("/me/:id").get(getUser);
userRoutes.route("/me/:id/update").get(updateUser);


userRoutes.route("/:id/balance").get(getBlanceUser);



userRoutes.route("/admin/status").post(createUserStatus).put(updateUserStatus);
userRoutes.route("/admin/status/:id").get(getUserStatus);
userRoutes.route("/admin/status/:id").delete(deleteUserStatus);

userRoutes.route("/admin/role").post(createUserRole).put(updateUserRole);
userRoutes.route("/admin/role/:id").get(getUserRole);
userRoutes.route("/admin/role/:id").delete(deleteUserRole);

export default userRoutes;
