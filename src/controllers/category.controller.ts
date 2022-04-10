import { Request, Response } from 'express'
import { Category, CategoryInput } from '../models/category.model'

const getAllCategory = async (req: Request, res: Response) => {
  const categories = await Category.find().sort('-createdAt').exec()

  return res.status(200).json({ data: categories })
}

const createCategory = async (req: Request, res: Response) => {
  const { description, name, status } = req.body

  const categoryInput: CategoryInput = {
    name,
    description,
  }

  if (typeof status != 'undefined') {
    categoryInput.status = status
  }

  try {
    const categoryCreated = await Category.create(categoryInput)
    return res.status(201).json(categoryCreated)
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({
        message:
          err.message || 'Some error occurred while creating a Category.',
      })
    }
  }
}

const getCategory = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const category = await Category.findOne({ _id: id })
    if (!category) {
      return res
        .status(404)
        .json({ message: `Category with id "${id}" not found.` })
    }
    return res.status(200).json(category)
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({
        message: err.message || 'Some error occurred while getting a Category.',
      })
    }
  }
}

const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    await Category.findByIdAndDelete(id)
    return res.status(200).json({ message: 'Category deleted successfully.' })
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({
        message:
          err.message || 'Some error occurred while deleting a Category.',
      })
    }
  }
}

const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params
  const { description, name, status } = req.body

  try {
    const category = await Category.findOne({ _id: id })
    if (!category) {
      return res
        .status(404)
        .json({ message: `Category with id "${id}" not found.` })
    }

    const categoryInput: CategoryInput = {
      name,
      description,
    }

    if (typeof status != 'undefined') {
      categoryInput.status = status
    }

    await Category.updateOne({ _id: id }, categoryInput)
    const categoryUpdated = await Category.findById(id)
    return res.status(200).json(categoryUpdated)
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({
        message:
          err.message || 'Some error occurred while updating a Category.',
      })
    }
  }
}
export {
  getAllCategory,
  createCategory,
  getCategory,
  deleteCategory,
  updateCategory,
}
