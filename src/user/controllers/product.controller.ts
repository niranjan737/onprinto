import { Controller, Get, Path, Route, Tags } from "tsoa";
import { Types } from "mongoose";

import { Product, ProductOutput } from "../../models/product.model";
import { ResourceNotFoundError } from "../../models/error.model";

@Route("/api")
@Tags("User")
export class ProductController extends Controller {
  @Get("/products")
  public async getAllProduct(): Promise<ProductOutput[]> {
    const products = Product.aggregate([
      { $match: { status: 1 } },
      {
        $lookup: {
          from: "productimages",
          localField: "_id",
          foreignField: "productId",
          as: "images",
        },
      },
      { $sort: { createdAt: -1 } },
    ]).exec();
    return products;
  }

  @Get("/product/{id}")
  public async getProduct(
    @Path("id") id: string
  ): Promise<ProductOutput | null> {
    const product = await Product.aggregate([
      { $match: { _id: Types.ObjectId(id) } },
      { $limit: 1 },
      {
        $lookup: {
          from: "productimages",
          localField: "_id",
          foreignField: "productId",
          as: "images",
        },
      },
      { $sort: { createdAt: -1 } },
    ]);
    if (!product.length) {
      throw new ResourceNotFoundError("Product not found");
    }
    return product.length ? product[0] : null;
  }
}
