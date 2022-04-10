import { Router } from 'express'

import { validate } from '../middleware/CommonController.validate'
import { ProductaddValidationRules } from '../middleware/ProductController.validate'

import {
  getAllProduct,
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
} from '../controllers/product.controller'

const router = Router()

/**
 * @swagger
 * /api/admin/products:
 *   get:
 *     summary: Retrieve a list of product
 *     description: Retrieve a list of product.
 *     responses:
 *       200:
 *         description: A list of products.
 */
router.get('/admin/products', getAllProduct)

router.post(
  '/admin/product',
  ProductaddValidationRules(),
  validate,
  createProduct
)

/**
 * @swagger
 * /api/admin/product/{id}:
 *   get:
 *     summary: Retrieve a  product
 *     description: Retrieve a product.
 *     responses:
 *       200:
 *         description: A product.
 */
router.get('/admin/product/:id', getProduct)

router.put(
  '/admin/product/:id',
  ProductaddValidationRules(),
  validate,
  updateProduct
)

router.delete('/admin/product/:id', deleteProduct)

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retrieve a list of products
 *     description: Retrieve a list of products.
 *     responses:
 *       200:
 *         description: A list of product.
 */
router.get('/products', getAllProduct)

/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     summary: Retrieve a product
 *     description: Retrieve a product.
 *     responses:
 *       200:
 *         description: A product.
 */
router.get('/admin/:id', getProduct)

export default router
