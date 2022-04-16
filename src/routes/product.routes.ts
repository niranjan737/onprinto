import { Router, Request, Response } from "express";

import { validate } from "../middleware/CommonController.validate";
import { ProductaddValidationRules } from "../middleware/ProductController.validate";

import { ProductController } from "../controllers/product.controller";

const router = Router();

router.get("/admin/products", async (_req, res, next) => {
  const controller = new ProductController();

  try {
    const response = await controller.getAllProduct();
    return res.json(response);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/admin/product",
  ProductaddValidationRules(),
  validate,
  async (req: Request, res: Response, next: Function) => {
    const controller = new ProductController();
    const {
      description,
      name,
      status,
      size,
      price,
      offerPrice,
      deliveryPrice,
    } = req.body;
    try {
      const response = await controller.createProduct({
        description,
        name,
        status,
        size,
        price,
        offerPrice,
        deliveryPrice,
      });
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/admin/product/:id",
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

router.put(
  "/admin/product/:id",
  ProductaddValidationRules(),
  validate,
  async (req: Request, res: Response, next: Function) => {
    const controller = new ProductController();
    const { id } = req.params;
    const {
      description,
      name,
      status,
      size,
      price,
      offerPrice,
      deliveryPrice,
    } = req.body;
    try {
      const response = await controller.updateProduct(id, {
        description,
        name,
        status,
        size,
        price,
        offerPrice,
        deliveryPrice,
      });
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/admin/product/:id",
  async (req: Request, res: Response, next: Function) => {
    const controller = new ProductController();
    const { id } = req.params;
    try {
      const response = await controller.deleteProduct(id);
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
