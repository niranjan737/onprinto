import { Request, Response } from 'express'
import { Product, ProductInput } from '../models/product.model'

const getAllProduct = async (req: Request, res: Response) => {
  const products = await Product.find().sort('-createdAt').exec()

  return res.status(200).json({ data: products })
}

const createProduct = async (req: Request, res: Response) => {
  const { description, name, status, size, price, offerPrice, deliveryPrice } =
    req.body

  const productInput: ProductInput = {
    name,
    description,
  }

  if (typeof status != 'undefined') {
    productInput.status = status
  }
  if (typeof size != 'undefined') {
    productInput.size = size
  }
  if (typeof price != 'undefined') {
    productInput.price = price
  }
  if (typeof offerPrice != 'undefined') {
    productInput.offerPrice = offerPrice
  }
  if (typeof deliveryPrice != 'undefined') {
    productInput.deliveryPrice = deliveryPrice
  }

  try {
    const productCreated = await Product.create(productInput)
    return res.status(201).json(productCreated)
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({
        message: err.message || 'Some error occurred while adding a Product.',
      })
    }
  }
}

const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const product = await Product.findOne({ _id: id })
    if (!product) {
      return res
        .status(404)
        .json({ message: `Product with id "${id}" not found.` })
    }
    return res.status(200).json(product)
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({
        message: err.message || 'Some error occurred while getting a Product.',
      })
    }
  }
}

const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    await Product.findByIdAndDelete(id)
    return res.status(200).json({ message: 'Category deleted successfully.' })
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({
        message: err.message || 'Some error occurred while deleting a Product.',
      })
    }
  }
}

const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params
  const { description, name, status, size, price, offerPrice, deliveryPrice } =
    req.body

  try {
    const product = await Product.findOne({ _id: id })
    if (!product) {
      return res
        .status(404)
        .json({ message: `Product with id "${id}" not found.` })
    }

    const productInput: ProductInput = {
      name,
      description,
    }

    if (typeof status != 'undefined') {
      productInput.status = status
    }
    if (typeof size != 'undefined') {
      productInput.size = size
    }
    if (typeof price != 'undefined') {
      productInput.price = price
    }
    if (typeof offerPrice != 'undefined') {
      productInput.offerPrice = offerPrice
    }
    if (typeof deliveryPrice != 'undefined') {
      productInput.deliveryPrice = deliveryPrice
    }

    if (typeof status != 'undefined') {
      productInput.status = status
    }

    await Product.updateOne({ _id: id }, productInput)
    const categoryUpdated = await Product.findById(id)
    return res.status(200).json(categoryUpdated)
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({
        message: err.message || 'Some error occurred while updating a Product.',
      })
    }
  }
}
export {
  getAllProduct,
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
}
