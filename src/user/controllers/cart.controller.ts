import { Controller, Get, Path, Route, Tags, Delete,Post, Body } from "tsoa";
import { Types } from "mongoose";

import { Product, ProductOutput } from "../../models/product.model";
import { Cart, CartInput, CartOutput, ICart } from "../../models/cart.model";
import { ResourceNotFoundError } from "../../models/error.model";
import { IUser } from "../../models/user.model";
import { LoginUser } from "../../interfaces";

const productSelectAttribute = {_id: 1, size:1,available:1, status:1, name:1, description:1, price:1, deliveryPrice:1,offerPrice:1, createdAt: 1, updatedAt:1 };
const cartSelectAttribute = {_id: 1, quantity:1, productId:1, image:1, createdAt: 1, updatedAt:1 };

export class CartController extends Controller {
  public async addCartProduct(cartInput: CartInput, user:LoginUser): Promise<CartOutput | null> {

    const { productId, quantity} = cartInput;
    const cartInsert = { productId, quantity:quantity || 1, userId:user?.userId};


    const product = await Product.findById(productId);
    if (!product) {
      throw new ResourceNotFoundError("productId not found");
    }
    let cart = await Cart.create(cartInsert);
    const cartOutput = await Cart.findById(cart.id).select(cartSelectAttribute);
    return cartOutput;
  }

  public async getAllCartProduct(user:LoginUser): Promise<ProductOutput[]> {
    
    const userId =  user?.userId;

   const cart =  await Cart.aggregate([
    { $match: { userId: userId} },
    {
      $addFields: {
        productId: {
          $toObjectId: "$productId"
        }
      }
    },
  {
    $lookup: {
      from: "products",
      localField: "productId",
      foreignField: "_id",
      as: "cart_products"
    }
  },
  {
    $unwind: {
      path: "$cart_products",
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $replaceRoot: {
      newRoot: {
        $mergeObjects: [
          "$cart_products",
          "$$ROOT"
        ]
      }
    }
  },
  {
    $project: {
      cart_products: 0
    }
  }
])

    return cart as ProductOutput[];
  }

  @Delete("/cart/product/{productId}")
  public async deleteCartProduct(
    @Path("productId") productId: string, user:LoginUser
  ): Promise<ICart | undefined | null> {
    const userId =  user?.userId;

    try{
       const cart = await Cart.findOne({productId: productId, userId: userId});
      if (!cart) {
        throw new ResourceNotFoundError("Product not found to delete");
      }else{
        return await Cart.findByIdAndDelete((cart as any)?._id);
      }
    }catch(err){
      console.log('err', err);
      throw err;
    }
  }
}
