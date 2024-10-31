import express, { NextFunction, Request, Response } from "express";
import * as service from "../service/cart.service";
import * as repository from "../repository/cart.repository";
import { ValidateRequest } from "../utils/validator";
import { CartRequestInput, CartRequestSchema } from "../dto/cartRequest.do";
import { RequestAuthorizer } from "./middleware";

const router = express.Router();
const repo = repository.CartRepository;

router.post(
  "/cart",
  // RequestAuthorizer,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      if (!user) {
        next(new Error("User not found"));
        return;
      }

      const error = ValidateRequest<CartRequestInput>(
        req.body,
        CartRequestSchema
      );

      if (error) {
        res.status(404).json({ error });
        return;
      }

      const input: CartRequestInput = req.body;

      const response = await service.CreateCart(
        {
          ...input,
          customerId: user.id,
        },
        repo
      );
      res.status(200).json(response);
      return;
    } catch (error) {
      next(error);
    }
  }
);

export default router;
