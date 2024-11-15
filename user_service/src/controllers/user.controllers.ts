import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service"; // Giả sử bạn có CartService
import { UserRepository } from "../repositories/user.repository";

export const userService = new UserService(new UserRepository());

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
    const {id} = req.body
    const cart = await userService.getBalanceUser(id);
    res.status(201).json({
      message: "User created successfully",
      data: cart,
      status: 201,
    });
  } catch (error) {
    console.error("Error during createCart:", error);
  }
};
