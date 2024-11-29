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
} from "../middlewares/user.validator.middlewares";
import { isAuthenticatedUser } from "../middlewares/user.auth.middlewates";

const userRoutes = Router();

userRoutes.route("/register").post(validate(valiRegister), regiserUser);
userRoutes.route("/login").post(validate(valiLogin), loginUser);
userRoutes.route("/token").post(refreshToken);
userRoutes.route("/password/forgot").post(validate(valiForgot), forgotPassword);
userRoutes.route("/password/reset").post(resetPassword);
userRoutes.route("/password/update").post(isAuthenticatedUser,changePassword);
userRoutes.route("/me").get(isAuthenticatedUser,getUser);
userRoutes.route("/me/update").get(isAuthenticatedUser,updateUser);

userRoutes.route("/:id/balance").get(getBlanceUser);

userRoutes.route("/admin/status").post(createUserStatus).put(updateUserStatus);
userRoutes.route("/admin/status/:id").get(getUserStatus);
userRoutes.route("/admin/status/:id").delete(deleteUserStatus);

userRoutes.route("/admin/role").post(createUserRole).put(updateUserRole);
userRoutes.route("/admin/role/:id").get(getUserRole);
userRoutes.route("/admin/role/:id").delete(deleteUserRole);

export default userRoutes;
