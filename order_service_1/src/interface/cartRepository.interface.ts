import { Carts, CartLineItems } from "../models/cart.model";

export interface ICartsRepository {
  create(data: Carts): Promise<Carts>;
  findOne(id: number): Promise<Carts>;
}


export interface ICartLineItemsRepository {
  create(data: CartLineItems): Promise<CartLineItems>;
  findOne(id: number): Promise<CartLineItems>;
}