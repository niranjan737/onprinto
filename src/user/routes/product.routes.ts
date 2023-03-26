import { Router, Request, Response } from "express";

import { ProductController } from "../controllers/product.controller";
import { CartController } from "../controllers/cart.controller";
import { auth } from './../../middleware/AuthMiddleware'

const router = Router();

export interface CustomRequest extends Request {
  decoded: any;
}

router.get("/products", async (_req, res, next) => {
  const controller = new ProductController();

  try {
    const response = await controller.getAllProduct();
    return res.json(response);
  } catch (err) {
    next(err);
  }
});

router.get(
  "/product/:id",
  async (req: Request, res: Response, next: Function) => {
    const controller = new ProductController();
    const { id } = req.params;
    try {
      const response = await controller.getProduct(id);
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/cart",auth,
  async (req: Request, res: Response, next: Function) => {
    const controller = new CartController();
    const request = req as CustomRequest;
    try {
      const response = await controller.getAllCartProduct(request.decoded);
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/cart",auth,async (req: Request, res: Response, next: Function) => {
    const controller = new CartController();
    const request = req as CustomRequest;
    try {
      const response = await controller.addCartProduct(req.body, request.decoded);
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/cart/product/:productId",auth,async (req: Request, res: Response, next: Function) => {
    const controller = new CartController();
    const request = req as CustomRequest;
    const { productId } = req.params;
    try {
      const response = await controller.deleteCartProduct(productId, request.decoded);
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
