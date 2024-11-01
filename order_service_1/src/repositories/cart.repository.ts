
import { PrismaClient } from "@prisma/client";
import { ICartsRepository } from "../interface/cartRepository.interface";
import { Carts } from "../models/cart.model";


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
}