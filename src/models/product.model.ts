import { Schema, model, Model } from 'mongoose'

type ProductInput = {
  name: string
  description?: string | null
  details?: string | null
  size?: string[]
  image?: String[]
  status?: number
  price?: number
  offerPrice?: number
  deliveryPrice?: number
}

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'A Product must have a name'],
    },
    description: String,
    size: {
      type: Array,
    },
    image: {
      type: Array,
    },
    status: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
    },
    offerPrice: {
      type: Number,
    },
    deliveryPrice: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
)
const Product: Model<ProductInput> = model<ProductInput>(
  'product',
  ProductSchema
)
export { Product, ProductInput }
