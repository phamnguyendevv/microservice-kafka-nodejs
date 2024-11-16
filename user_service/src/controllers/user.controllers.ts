import redis from "redis";
import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service"; // Giả sử bạn có CartService
import { UserRepository } from "../repositories/user.repository";
export const userService = new UserService(new UserRepository());
import client from "../redisClient";

export const regiserUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userData = {
      name: "John Doe", // Đây phải là kiểu `string`
      id: 1,
      pass: "password123",
      balance: 0,
      create_at: new Date(),
      update_at: new Date(),
    };
    const cart = await userService.registerUser(userData);
    res.status(201).json({
      message: "User created successfully",
      data: cart,
      status: 201,
    });
  } catch (error) {
    console.error("Error during createCart:", error);
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
