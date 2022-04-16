import { Router, Request, Response } from "express";

import { ProductController } from "../controllers/product.controller";

const router = Router();

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

export default router;
