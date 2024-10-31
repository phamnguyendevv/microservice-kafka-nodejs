import { Request, Response, NextFunction } from "express";
import { CartService } from "../services/cart.service"; // Giả sử bạn có CartService
import { CartRepository} from "../repositories/cart.repository"

export const catalogService = new CartService(new CartRepository());


export const createCart = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Giả sử req.body chứa thông tin cần thiết để tạo giỏ hàng
    const cartData = req.body;
    const cart = await catalogService.createProduct(cartData);

    res.status(201).json({
      message: "Cart created successfully",
      data: cart,
      status: 201,
    });
  } catch (error) {
    console.error("Error during createCart:", error);
  }
};
