import request from "supertest";
import express from "express";
import { faker } from "@faker-js/faker";
import catalogRoutes, { catalogService } from "../catalog.routes";
import { ProductFactory } from "../../utils/fixtures";

const app = express();
app.use(express.json());
app.use(catalogRoutes);

const mockRequest = () => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: +faker.commerce.price(),
    stock: faker.number.int({ min: 10, max: 100 }),
  };
};

describe("Catalog routes", () => {
  describe("POST /products", () => {
    test("should create product", async () => {
      const reqBody = mockRequest();
      const product = ProductFactory.build();
      jest
        .spyOn(catalogService, "createProduct")
        .mockResolvedValueOnce(product);
      const response = await request(app).post("/products").send(reqBody);
      expect(response.status).toBe(201);
      expect(response.body).toEqual(product);
    });

    test("should response with validation error 400", async () => {
      const requestBody = mockRequest();
      const response = await request(app)
        .post("/products")
        .send({ ...requestBody, name: "" })
        .set("Accept", "application/json");
      expect(response.status).toBe(400);
      expect(response.body).toEqual("name should not be empty");
    });

    test("should response with an internal error code 500", async () => {
      const requestBody = mockRequest();
      jest
        .spyOn(catalogService, "createProduct")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("unable to create product"))
        );
      const response = await request(app)
        .post("/products")
        .send(requestBody)
        .set("Accept", "application/json");
      expect(response.status).toBe(500);
      expect(response.body).toEqual("unable to create product");
    });
  });
});
