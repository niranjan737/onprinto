import { Schema, model, Model } from "mongoose";

type CartInput = {
  productId: string;
  quantity: number;
};

export interface CartOutput extends CartInput{
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}


interface Cart extends CartInput{
  userId: string;
};

interface ICart extends Cart {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

const CartSchema = new Schema(
  {
    productId: {
      type: String,
      required: [true, "A Cart must have a ProductId"],
    },
    userId: {
      type: String,
      required: [true, "A Cart must have a UserId"],
    },
    quantity: Number,
  },
  {
    timestamps: true,
  }
);
const Cart: Model<ICart> = model<ICart>("cart", CartSchema);
export { Cart, CartInput, ICart };
