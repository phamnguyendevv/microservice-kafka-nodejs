import express, { NextFunction, Request, Response, Router } from "express";
import { CatalogService } from "../services/catalog.service";
import { CatalogRepository } from "../repository/catalog.repository";
import { RequestValidator } from "../utils/requestValidator";
import { CreateProductRequest, UpdateProductRequest } from "../dto/product.dto";

const router = Router();

export const catalogService = new CatalogService(new CatalogRepository());

//--------------------------------------------------------product------------------------------------------------------------

router.post(
  "/products",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id, category_id, name, slug, price, image, description } =
        req.body;

      const input = {
        user_id,
        status_id: 3,
        category_id,
        name,
        slug,
        price,
        location: 84,
        inventory: 0,
        image,
        number_sold: 0,
        description,
        is_popular: true,
        code_discount: null,
        per_order: false,
        date_create: new Date(),
      };

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
//--------------------------------------------------------category------------------------------------------------------------

router.post(
  "/categories",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = req.body;
      const cate = await catalogService.createCategory(input);
      res.status(201).json({
        message: "Category created successfully",
        data: cate,
        status: 201,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/categories",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await catalogService.getCategories();

      res.status(200).json({
        message: "Category fetched successfully",
        data: data,
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/categories",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = req.body;
      const cate = await catalogService.updateCatagory(input);
      res.status(201).json({
        message: "Category created successfully",
        data: cate,
        status: 201,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/categories/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id) || 0;
    try {
      await catalogService.deleteCategory(id);
      res.status(200).json({
        message: "Category deleted successfully",
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
