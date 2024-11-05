
import { PrismaClient } from "@prisma/client";
import {
  ICartsRepository,
  ICartLineItemsRepository,
} from "../interface/cartRepository.interface";
import { Carts, CartLineItems } from "../models/cart.model";


export class CartRepository implements ICartsRepository {
  _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient();
  }

  async create(data: Carts): Promise<Carts> {
    return this._prisma.carts.create({
      data,
    });
  }

  async findOne(id: number): Promise<Carts> {
    
    const cart = await this._prisma.carts.findFirst({
      where: { id },
    });
    if (cart) {
      return Promise.resolve(cart);
    }
    throw new Error("product not found");
  }

  
}

export class CartLineItemRepository implements ICartLineItemsRepository {
  _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient();
  }

  async create(data: CartLineItems): Promise<CartLineItems> {
    return this._prisma.cartLineItems.create({
      data,
    });
  }

  async findOne(id: number): Promise<CartLineItems> {
    const cart = await this._prisma.cartLineItems.findFirst({
      where: { id },
    });
    if (cart) {
      return Promise.resolve(cart);
    }
    throw new Error("product not found");
  }
}