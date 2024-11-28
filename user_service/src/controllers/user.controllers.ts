import redis from "redis";
import { random } from "lodash";
import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service"; // Giả sử bạn có CartService
import { UserRepository } from "../repositories/user.repository";
export const userService = new UserService(new UserRepository());
import client from "../redisClient";
import genCode from "../utils/genCode";
import asyncHandler from "../utils/validate/handlers";
import { UserRole, UserStatus } from "../constants/statusRole";
import { hashSync } from "bcrypt";

export const regiserUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
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
      codeBank : codeBank,
    };
    const user = await userService.registerUser(userData);
    res.status(201).json({
      message: "User created successfully",
      data: user,
      status: 201,
    });
  } catch (error) {
    console.error("Error during createCart:", error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, pass } = req.body;
    const user = await userService.findUser(name);
    res.status(200).json({
      message: "User login successfully",
      data: user,
      status: 200,
    });
  } catch (error) {
    console.error("Error during login :", error);
  }
};

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
