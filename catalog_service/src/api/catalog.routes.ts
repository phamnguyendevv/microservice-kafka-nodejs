import express, { NextFunction, Request, Response, Router } from "express";
import { CatalogService } from "../services/catalog.service";
import { CatalogRepository } from "../repository/catalog.repository";
import { RequestValidator } from "../utils/requestValidator";
import { CreateProductRequest, UpdateProductRequest } from "../dto/product.dto";

const router = Router();

export const catalogService = new CatalogService(new CatalogRepository());

router.post(
  "/products",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { errors, input } = await RequestValidator(
        CreateProductRequest,
        req.body
      );

      if (errors) {
        res.status(400).json(errors);
        return;
      }

      const data = await catalogService.createProduct(input);
      res.status(201).json(data);
    } catch (error) {
      next(error); // Gọi hàm `next` để sử dụng hàm xử lý lỗi
    }
  }
);

export default router;
