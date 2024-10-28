import { ICatalogRepository } from "../../interface/catalogRepository.interface";
import { Product } from "../../models/product.model";
import { MockCatalogRepository } from "../../repository/mockCatalog.repository";
import { ProductFactory } from "../../utils/fixtures";
import { CatalogService } from "../catalog.service";
import { faker } from "@faker-js/faker";

const mockProduct = (
  rest: Partial<{ price: number; name?: string; description?: string; id: number }>
) => {
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    stock: faker.number.int({ min: 10, max: 100 }),
    ...rest,
  };
};

describe("catalogService", () => {
  let repository: ICatalogRepository;

  beforeEach(() => {
    repository = new MockCatalogRepository();
  });

  afterEach(() => {
    repository = {} as MockCatalogRepository;
  });

  describe("createProduct", () => {
    test("should create product", async () => {
      const service = new CatalogService(repository);
      const reqBody = mockProduct({
        price: +faker.commerce.price(),
      });
      const result = await service.createProduct(reqBody);
      expect(result).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        description: expect.any(String),
        price: expect.any(Number),
        stock: expect.any(Number),
      });
    });
    test("should throw error when unable to create product", async () => {
      const service = new CatalogService(repository);
      const reqBody = mockProduct({
        price: +faker.commerce.price(),
      });
      jest.spyOn(repository, "create").mockImplementationOnce(() =>
        Promise.reject(new Error("Unable to create product"))
      );
      await expect(service.createProduct(reqBody)).rejects.toThrow(
        "Unable to create product"
      );
    })
  })

  describe("updateProduct", () => {
    test("should update product", async () => {
      const service = new CatalogService(repository);
      const reqBody = mockProduct({
        price: +faker.commerce.price(),
        id: faker.number.int({ min: 10, max: 1000 })
      });
      const result = await service.updateProduct(reqBody);
      expect(result).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        description: expect.any(String),
        price: expect.any(Number),
        stock: expect.any(Number),
      });
    });
    test("should throw error when unable to update product", async () => {
      const service = new CatalogService(repository);
      const reqBody = mockProduct({
        price: +faker.commerce.price(),
      });
      jest.spyOn(repository, "update").mockImplementationOnce(() =>
        Promise.reject(new Error("Unable to update product"))
      );
      await expect(service.updateProduct(reqBody)).rejects.toThrow(
        "Unable to update product"
      );
    })
  })
});
