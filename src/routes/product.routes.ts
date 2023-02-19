import { Router, Request, Response } from "express";

import { validate } from "../middleware/CommonController.validate";
import { ProductaddValidationRules } from "../middleware/ProductController.validate";

import { ProductController } from "../controllers/product.controller";
const { productImageUpload } = require("../middleware/ImageUpoloadController");
import { auth } from './../middleware/AuthMiddleware'


const router = Router();

router.get("/admin/products",auth, async (_req, res, next) => {
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
      category,
      available,
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
        category,
        available,
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

router.put(
  "/admin/product/:id/upload-image",
  productImageUpload.single("image"),
  async (req: Request, res: Response, next: Function) => {
    const controller = new ProductController();
    const { id } = req.params;

    try {
      const response = await controller.uploadProductImage(
        id,
        (req.file && req.file.filename) || ""
      );
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
      category,
      available,
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
        category,
        available,
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

router.get("/admin/product/:id/images", async (req, res, next) => {
  const controller = new ProductController();
  const { id } = req.params;
  try {
    const response = await controller.getProductImages(id);
    return res.json(response);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/admin/product/:id/image",
  productImageUpload.single("image"),
  async (req: Request, res: Response, next: Function) => {
    const controller = new ProductController();
    const { id } = req.params;

    try {
      const response = await controller.uploadProductImages(
        id,
        (req.file && req.file.filename) || ""
      );
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/admin/product/:id/image/:imageId",
  async (req: Request, res: Response, next: Function) => {
    const controller = new ProductController();
    const { id, imageId } = req.params;
    try {
      const response = await controller.deleteProductImage(id, imageId);
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
