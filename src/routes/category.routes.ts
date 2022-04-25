import { Router, Request, Response } from "express";

import { validate } from "../middleware/CommonController.validate";
import { CategoryaddValidationRules } from "../middleware/CategoryController.validate";

import { CategoryController } from "../controllers/category.controller";
import { upload } from "../middleware/ImageUpoloadController";

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
  upload.single("image"),
  CategoryaddValidationRules(),
  validate,
  async (req: Request, res: Response, next: Function) => {
    const controller = new CategoryController();
    try {
      const response = await controller.createCategory(req.body);
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
    try {
      const response = await controller.updateCategory(id, req.body);
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
