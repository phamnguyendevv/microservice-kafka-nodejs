import express, { NextFunction, Request, Response, Router } from "express";
import { CatalogService } from "../services/catalog.service";
import { CatalogRepository } from "../repository/catalog.repository";
import { RequestValidator } from "../utils/requestValidator";
import { CreateProductRequest, UpdateProductRequest } from "../dto/product.dto";

const router = Router();

export const catalogService = new CatalogService(new CatalogRepository());

router.post(
  "/products",
  async (req: Request, res: Response, next: NextFunction) => {
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
      next(error);
    }
  }
);

router.patch(
  "/products/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { errors, input } = await RequestValidator(
        UpdateProductRequest,
        req.body
      );

      const id = parseInt(req.params.id) || 0;

      if (errors) {
        res.status(400).json(errors);
        return;
      }

      const data = await catalogService.updateProduct({ id, ...input });
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }
);
router.get(
  "/products/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id) || 0;
    try {
      const data = await catalogService.getProduct(id);
       res.status(200).json(data);
    } catch (error) {
       next(error);
    }
  }
);


router.get(
  "/products",
  async (req: Request, res: Response, next: NextFunction) => {
    const limit = Number(req.query["limit"]);
    const offset = Number(req.query["offset"]);
    try {
      
      const data = await catalogService.getProducts(limit, offset);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
