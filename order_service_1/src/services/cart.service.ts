import { ICartsRepository } from "../interface/cartRepository.interface";

export class CartService {
  private _repository: ICartsRepository;

  constructor(repository: ICartsRepository) {
    this._repository = repository;
  }

  async createCart(input: any) {
    const data = await this._repository.create(input);
    if (!data.id) {
      throw new Error("unable to create cart");
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
