import { Schema, model, Model } from "mongoose";

type ProductInput = {
  name: string;
  description?: string | null;
  category?: string | null;
  details?: string | null;
  size?: string[];
  status?: number;
  price?: number;
  offerPrice?: number;
  deliveryPrice?: number;
  available?: number;
};

interface IProduct extends ProductInput {
  _id: string;
  image?: String;
  createdAt: Date;
  updatedAt: Date;
}

interface ProductOutput extends IProduct {
  images?: string[];
}

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "A Product must have a name"],
    },
    description: String,
    category: {
      type: String,
    },
    size: {
      type: Array,
    },
    image: {
      type: String,
    },
    available: {
      type: Number,
      default: 1,
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
);
const Product: Model<IProduct> = model<IProduct>("product", ProductSchema);
export { Product, ProductInput, IProduct, ProductOutput };
