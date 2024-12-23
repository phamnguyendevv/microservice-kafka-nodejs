import { Product } from "../models/product.model";

export interface ICatalogRepository {
  create(data: Product): Promise<Product>;
  update(data: Product): Promise<Product>;
  delete(id: any);
  find(limit: number, offset: number): Promise<Product[]>;
  findOne(id: number): Promise<Product>;

  createCategory(data: any): Promise<any>;
  getCategories(): Promise<any>;
  updateCategory(data: any): Promise<any>;
  deleteCategory(id: any): Promise<any>;
}
