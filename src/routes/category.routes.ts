import { Router } from 'express'

import { validate } from '../middleware/CommonController.validate'
import { CategoryaddValidationRules } from '../middleware/CategoryController.validate'

import {
  getAllCategory,
  createCategory,
  getCategory,
  deleteCategory,
  updateCategory,
} from '../controllers/category.controller'

const router = Router()

/**
 * @swagger
 * /api/admin/categories:
 *   get:
 *     summary: Retrieve a list of categories
 *     description: Retrieve a list of categories.
 *     responses:
 *       200:
 *         description: A list of categories.
 */
// router.get('/admin/categories', getAllCategory)

/**
 * @swagger
 * /api/admin/category:
 *   post:
 *     summary: Create a Category.
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name.
 *                 example: Leanne Graham
 * description:
 *                 type: string
 *                 description: The user's name.
 *                 example: Leanne Graham
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The user ID.
 *                       example: 0
 *                     name:
 *                       type: string
 *                       description: The user's name.
 *                       example: Leanne Graham
 */
router.post(
  '/admin/category',
  CategoryaddValidationRules(),
  validate,
  createCategory
)

/**
 * @swagger
 * /api/admin/category/{id}:
 *   get:
 *     summary: Retrieve a  category
 *     description: Retrieve a ategory.
 *     responses:
 *       200:
 *         description: A category.
 */
router.get('/admin/category/:id', getCategory)

router.put(
  '/admin/category/:id',
  CategoryaddValidationRules(),
  validate,
  updateCategory
)

router.delete('/admin/category/:id', deleteCategory)

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Retrieve a list of categories
 *     description: Retrieve a list of categories.
 *     responses:
 *       200:
 *         description: A list of categories.
 */

router.get('/admin/categories', async (req, res, next) => {
  try {
    let emailFetch = await getAllCategory(req, res)
    res.send(emailFetch)
  } catch (err) {
    next(err)
  }
})

export default router
