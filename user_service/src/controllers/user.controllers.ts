import redis from "redis";
import { random } from "lodash";
import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service"; // Giả sử bạn có CartService
import { UserRepository } from "../repositories/user.repository";
export const userService = new UserService(new UserRepository());
import { CustomRequest } from "../types/user.type";
import client from "../redisClient";
import genCode from "../utils/genCode";
import asyncHandler from "../utils/validate/handlers";
import { UserRole, UserStatus } from "../constants/statusRole";
import { hashSync } from "bcrypt";
import bcrypt from "bcrypt";
import ErrorHandler from "../utils/validate/error";
import { Users } from "../models/user.model";
import { signAccessToken, signRefreshToken, verifyToken } from "../utils/token";
import { JwtPayload } from "jsonwebtoken";
import { sendEmail } from "../utils/email";

const tempCodes: any = {};

export const regiserUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { full_name, email, password, qr_data } = req.body;
      const hashedPassword = hashSync(password, 10);
      const referralCode = genCode();
      const codeBank = "AUTOMMO" + random(100, 999);

      const userData = {
        status_id: UserStatus.NOTVERIFY,
        role_id: UserRole.USER,
        full_name: full_name, // Đây phải là kiểu `string`
        email: email,
        password: hashedPassword,
        qr_data: qr_data,
        referrer_id: "9999",
        phone: "097322345",
        sex: "female",
        balance: 0,
        is_online: true,
        referral_code: referralCode,
        code_bank: codeBank,
      };
      const user = await userService.registerUser(userData);
      res.status(201).json({
        message: "User created successfully",
        data: user,
        status: 201,
      });
    } catch (error) {
      console.error("Error during createCart:", error);
      return next(new ErrorHandler("Register failed", 500));
    }
  }
);

export const loginUser = asyncHandler(
  async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user = req.user;
      const { password, created_at, updated_at, ...usercustom } = user;
      const accessToken = signAccessToken(usercustom);
      const refreshToken = signRefreshToken(usercustom);
      const token = { accessToken, refreshToken };

      res.status(200).json({
        message: "User login successfully",
        data: { user: usercustom, token: token },
        status: 200,
      });
    } catch (error) {
      console.error("Error during login :", error);
      return next(new ErrorHandler("Login failed", 500));
    }
  }
);

export const refreshToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return next(new ErrorHandler("Refresh token is required", 400));
      }
      const decoded = verifyToken(refreshToken);
      if (!decoded) {
        return next(new ErrorHandler("Invalid refresh token", 400));
      }
      const { iat, exp, ...userPayload } = decoded as JwtPayload;
      const accessToken = signAccessToken(userPayload);
      res.status(200).json({
        message: "Refresh token successful",
        data: { user: userPayload, tokens: { accessToken, refreshToken } },
        status: 200,
      });
    } catch (error) {
      console.error("Error during refresh token:", error);
      return next(new ErrorHandler("Refresh token failed", 500));
    }
  }
);

export const forgotPassword = asyncHandler(
  async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user = req.user;

      const now = Date.now();
      const expirationTime = now + 60 * 1000; // 60 seconds from now
      const code = genCode();
      const code_verify = `${user.id}${code}`;

      // Store the new code and expiration time
      tempCodes[user.email] = {
        code: code_verify,
        expiresAt: expirationTime,
      };
      try {
        await sendEmail(
          user.email,
          "Gửi mã Xác nhận",
          "Mã xác nhận của bạn là: " + code_verify
        );

        res
          .status(200)
          .json({ message: "Send code verify successful", status: 200 });
      } catch (error) {
        console.error("Error during forgot password:", error);
        return next(new ErrorHandler("Cannot send email", 500));
      }
    } catch (error) {
      console.error("Error during forgot password:", error);
      return next(new ErrorHandler("Forgot password failed", 500));
    }
  }
);

export const resetPassword = asyncHandler(
  async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email, code, new_password } = req.body;
      const user = req.user;
      const code_verify = tempCodes[email];
      if (!code_verify || code_verify.code !== code) {
        return next(new ErrorHandler("Invalid code", 400));
      }
      if (code_verify.expiresAt < Date.now()) {
        return next(new ErrorHandler("Code expired", 400));
      }
      const hashedPassword = hashSync(new_password, 10);
      const updatedUser = await userService.updateUser(user.id, {
        password: hashedPassword,
      });
      res.status(200).json({
        message: "Reset password successfully",
        data: updatedUser,
        status: 200,
      });
    } catch (error) {
      console.error("Error during reset password:", error);
      return next(new ErrorHandler("Reset password failed", 500));
    }
  }
);

export const changePassword = asyncHandler(
  async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { old_password, new_password } = req.body;
      const user = req.user;
      const isPasswordMatch = await bcrypt.compare(old_password, user.password);
      if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid password", 400));
      }
      const hashedPassword = hashSync(new_password, 10);
      const updatedUser = await userService.updateUser(user.id, {
        password: hashedPassword,
      });
      res.status(200).json({
        message: "Change password successfully",
        data: updatedUser,
        status: 200,
      });
    } catch (error) {
      console.error("Error during change password:", error);
      return next(new ErrorHandler("Change password failed", 500));
    }
  }
);

export const getUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const numericId = Number(id);
      const user = await userService.findUserById(numericId);
      const { password, ...usercustom } = user;
      res.status(200).json({
        message: "Get user successfully",
        data: usercustom,
        status: 200,
      });
    } catch (error) {
      console.error("Error during get user:", error);
      return next(new ErrorHandler("Get user failed", 500));
    }
  }
);

export const updateUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const numericId = Number(id);
      const { status_id, role_id, avatar, full_name, phone, sex, name } =
        req.body;
      const user = await userService.findUserById(numericId);
      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }
      const data: any = {};

      if (status_id) data.status_id = status_id;
      if (role_id) data.role_id = role_id;
      if (avatar) data.avatar = avatar;
      if (full_name) data.full_name = full_name;
      if (phone) data.phone = phone;
      if (sex) data.sex = sex;
      if (name) data.name = name;
      // Chỉ cập nhật nếu có dữ liệu cần update
      if (Object.keys(data).length > 0) {
        const result = await userService.updateUser(numericId, data);

        const { password, referrer_id, ...usercustom } = result;
        res.status(200).json({  
          message: "Update user successful",
          data: usercustom,
          status: 200,
        });
        return;
      } else {
        return next(new ErrorHandler("No data to update", 400));
      }
    } catch (error) {
      console.error("Error during update user:", error);
      return next(new ErrorHandler("Update user failed", 500));
    }
  }
);

export const getUserStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const numericId = Number(id);
    const status = await userService.getStatusUser(numericId);
    res.status(200).json({
      message: "Get status user successfully",
      data: status,
      status: 200,
    });
  } catch (error) {
    console.error("Error during get status user:", error);
  }
};

export const createUserStatus = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name } = req.body;
      const data = {
        name: name,
      };

      const status = await userService.createStatusUser(data);
      res.status(201).json({
        message: "Create status user successfully",
        data: status,
        status: 201,
      });
    } catch (error) {
      console.error("Error during create status user:", error);
      next(error);
    }
  }
);

export const updateUserStatus = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const numericId = Number(id);
      const { name } = req.body;
      const status_id = {
        name: name,
      };
      const status = await userService.updateStatusUser(numericId, status_id);
      res.status(200).json({
        message: "Update status user successfully",
        data: status,
        status: 200,
      });
    } catch (error) {
      console.error("Error during update status user:", error);
      next(error);
    }
  }
);

export const deleteUserStatus = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const numericId = Number(id);
      const status = await userService.deleteStatusUser(numericId);
      res.status(200).json({
        message: "Delete status user successfully",
        data: status,
        status: 200,
      });
    } catch (error) {
      console.error("Error during delete status user:", error);
      next(error);
    }
  }
);

export const getUserRole = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const numericId = Number(id);
      const role = await userService.getRoleUser(numericId);
      res.status(200).json({
        message: "Get role user successfully",
        data: role,
        status: 200,
      });
    } catch (error) {
      console.error("Error during get role user:", error);
      next(error);
    }
  }
);

export const createUserRole = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name } = req.body;
    const data = {
      name: name,
    };
    const role = await userService.createRoleUser(data);
    res.status(201).json({
      message: "Create role user successfully",
      data: role,
      status: 201,
    });
  } catch (error) {
    console.error("Error during create role user:", error);
  }
};

export const updateUserRole = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const numericId = Number(id);
    const { role_id } = req.body;
    const role = await userService.updateRoleUser(numericId, role_id);
    res.status(200).json({
      message: "Update role user successfully",
      data: role,
      status: 200,
    });
  } catch (error) {
    console.error("Error during update role user:", error);
  }
};

export const deleteUserRole = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const numericId = Number(id);
    const role = await userService.deleteRoleUser(numericId);
    res.status(200).json({
      message: "Delete role user successfully",
      data: role,
      status: 200,
    });
  } catch (error) {
    console.error("Error during delete role user:", error);
  }
};

export const getBlanceUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const numericId = Number(id);
    // **Enhance Error Handling:**
    if (isNaN(numericId)) {
      res.status(400).json({
        error: "Invalid user ID format (must be a number)",
        status: 400,
      });
      return;
    }
    // Kiểm tra Redis trước khi truy vấn DB
    const cacheKey = `user:${numericId}:balance`;
    console.log(cacheKey);

    // **Modern Asynchronous Await/Async Approach:**
    const cachedBalance = await client.get(cacheKey);
    if (cachedBalance) {
      try {
        // **Parse Safely:**
        const parsedBalance = JSON.parse(cachedBalance);
        res.status(200).json({
          message: "Get balance user successfully (from cache)",
          data: parsedBalance,
          status: 200,
        });
        return;
      } catch (parseError) {
        console.error("Error parsing cached balance:", parseError);
        // Consider logging the raw cachedBalance for debugging
      }
    }

    // **Database Fetch:**
    const balance = await userService.getBalanceUser(numericId);
    // Redis Caching (manual implementation)
    await client.set(cacheKey, JSON.stringify(balance));
    await client.expire(cacheKey, 3600);
    // **Response:**
    res.status(200).json({
      message: "Get balance user successfully",
      data: balance,
      status: 200,
    });
    return;
  } catch (error) {
    console.error("Error during get balance user:", error);
    res.status(500).json({
      error: "Internal Server Error",
      status: 500,
    });
    return;
  }
};
