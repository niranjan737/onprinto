import { Schema, model, Model } from "mongoose";

type ProductImageInput = {
  name: string;
  productId: string;
};

interface IProductImage extends ProductImageInput {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductImageSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "A Product Image must have Image name"],
    },
    productId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const ProductImage: Model<IProductImage> = model<IProductImage>(
  "productImage",
  ProductImageSchema
);
export { ProductImage, IProductImage, ProductImageInput };
