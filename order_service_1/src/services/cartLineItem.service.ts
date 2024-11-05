import { ICartLineItemsRepository } from "../interface/cartRepository.interface";

export class CartLineItemsService {
  private _repository: ICartLineItemsRepository;

  constructor(repository: ICartLineItemsRepository) {
    this._repository = repository;
  }

  async addItemToCart(input: any) {
    const data = await this._repository.create(input);
    if (!data.id) {
      throw new Error("unable add item to cart");
    }
    return data;
  }
  async findOne(id: number) {
    const data = await this._repository.findOne(id);
    if (!data.id) {
      throw new Error("Not found cart");
    }
    return data;
  }
}
