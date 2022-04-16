import { Router, Request, Response } from "express";

import { CategoryController } from "../controllers/category.controller";

const router = Router();

router.get("/categories", async (_req, res, next) => {
  const controller = new CategoryController();

  try {
    const response = await controller.getAllCategory();
    return res.json(response);
  } catch (err) {
    next(err);
  }
});

router.get(
  "/category/:id",
  async (req: Request, res: Response, next: Function) => {
    const controller = new CategoryController();
    const { id } = req.params;
    try {
      const response = await controller.getCategory(id);
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
