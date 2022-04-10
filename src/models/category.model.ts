import { Schema, model, Model } from 'mongoose'

type CategoryInput = {
  name: string
  description?: string | null
  image?: String | null
  status?: number
}

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'A Category must have a name'],
    },
    description: String,
    image: String,
    status: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
)
const Category: Model<CategoryInput> = model<CategoryInput>(
  'category',
  CategorySchema
)
export { Category, CategoryInput }
