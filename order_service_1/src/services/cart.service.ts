import { ICartsRepository } from "../interface/cartRepository.interface";

export class CartService {
  private _repository: ICartsRepository;

  constructor(repository: ICartsRepository) {
    this._repository = repository;
  }

  async createProduct(input: any) {
    const data = await this._repository.create(input);
    if (!data.id) {
      throw new Error("unable to create product");
    }
    return data;
  }
}

