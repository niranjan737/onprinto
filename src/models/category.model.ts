import { Schema, model, Model, ObjectId } from "mongoose";

type CategoryInput = {
  name: string;
  description?: string | null;
  image?: String | null;
  status?: number;
};

interface ICategory extends CategoryInput {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "A Category must have a name"],
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
);
const Category: Model<ICategory> = model<ICategory>("category", CategorySchema);
export { Category, CategoryInput, ICategory };
