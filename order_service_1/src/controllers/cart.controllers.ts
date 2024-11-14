import { Request, Response, NextFunction } from "express";
import { CartService } from "../services/cart.service"; // Giả sử bạn có CartService
import { CartLineItemsService } from "../services/cartLineItem.service";
import {
  CartRepository,
  CartLineItemRepository,
} from "../repositories/cart.repository";

export const catalogService = new CartService(new CartRepository());
export const CartLineItemService = new CartLineItemsService(
  new CartLineItemRepository()
);

export const createCart = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Giả sử req.body chứa thông tin cần thiết để tạo giỏ hàng
    const { customerId } = req.body;

    const cartData = {
      customerId,
      create_at: new Date(),
      update_at: new Date(),
    };

    const cart = await catalogService.createCart(cartData);

    res.status(201).json({
      message: "Cart created successfully",
      data: cart,
      status: 201,
    });
  } catch (error) {
    console.error("Error during createCart:", error);
  }
};

export const getCart = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Giả sử req.body chứa thông tin cần thiết để tạo giỏ hàng
    const { userId } = req.body;

    const cart = await catalogService.findOne(userId);

    res.status(201).json({
      message: "Cart find successfully",
      data: cart,
      status: 201,
    });
  } catch (error) {
    console.error("Error during createCart:", error);
  }
};

export const addItemToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Giả sử req.body chứa thông tin cần thiết để tạo giỏ hàng
    const { productId, cartId, itemName, variant, qty, price } = req.body;
    // const data: any = {};

    // if (productId) data.productId = productId;
    // if (cartId) data.cartId = cartId;
    // if (itemName) data.itemName = itemName;
    // if (variant) data.variant = variant;
    // if (qty) data.qty = qty;
    // if (price) data.price = price;
    const create_at = new Date();
    const update_at = new Date();

    const data = {
      cartId,
      productId,
      itemName,
      variant,
      qty,
      price,
      create_at,
      update_at 
    };

    const cart = await CartLineItemService.addItemToCart(data);

    res.status(201).json({
      message: "Cart find successfully",
      data: cart,
      status: 201,
    });
  } catch (error) {
    console.error("Error during createCart:", error);
  }
};
