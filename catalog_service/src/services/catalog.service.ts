import { ICatalogRepository } from "../interface/catalogRepository.interface";

export class CatalogService {
  private _repository: ICatalogRepository;

  constructor(repository: ICatalogRepository) {
    this._repository = repository;
  }

  async createProduct(input: any) {
    const data = await this._repository.create(input);
    if (!data.id) {
      throw new Error("unable to create product");
    }
    return data;
  }
  async updateProduct(input: any) {
    const data = await this._repository.update(input);
    if (!data.id) {
      throw new Error("unable to update product");
    }
    return data;
  }
  // instead of this we will get product from Elastic search
  async getProducts(limit: number, offset: number) {
    const products = await this._repository.find(limit, offset);
    return products;
  }

  async getProduct(id: number) {
    const product = await this._repository.findOne(id);
    return product;
  }

  async deleteProduct(id: number) {
    const response = await this._repository.delete(id);
    // delete record from Elastic search
    return response;
  }

  //=====================================category=======================

  async createCategory(input: any) {
    const data = await this._repository.createCategory(input);
    if (!data.id) {
      throw new Error("unable to create category");
    }
    return data;
  }

  getCategories() {
    const data = this._repository.getCategories();
    return data;
  }

  updateCatagory(input: any) {
    // update category
    const data = this._repository.updateCategory(input);
    return data;
  }
  deleteCategory(id : number) {
    const data = this._repository.deleteCategory(id);
    return data
  }
  
}
