import { Router, Request, Response } from "express";

import { validate } from "../middleware/CommonController.validate";
import { CategoryaddValidationRules } from "../middleware/CategoryController.validate";

import { CategoryController } from "../controllers/category.controller";

const router = Router();

router.get("/admin/categories", async (_req, res, next) => {
  const controller = new CategoryController();

  try {
    const response = await controller.getAllCategory();
    return res.json(response);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/admin/category",
  CategoryaddValidationRules(),
  validate,
  async (req: Request, res: Response, next: Function) => {
    const controller = new CategoryController();
    const { description, name, status } = req.body;
    try {
      const response = await controller.createCategory({
        description,
        name,
        status,
      });
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/admin/category/:id",
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

router.put(
  "/admin/category/:id",
  CategoryaddValidationRules(),
  validate,
  async (req: Request, res: Response, next: Function) => {
    const controller = new CategoryController();
    const { id } = req.params;
    const { description, name, status } = req.body;
    try {
      const response = await controller.updateCategory(id, {
        description,
        name,
        status,
      });
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/admin/category/:id",
  async (req: Request, res: Response, next: Function) => {
    const controller = new CategoryController();
    const { id } = req.params;
    try {
      const response = await controller.deleteCategory(id);
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
