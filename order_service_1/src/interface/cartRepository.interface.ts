import { Carts } from "../models/cart.model";

export interface ICartsRepository {
  create(data: Carts): Promise<Carts>;
}
