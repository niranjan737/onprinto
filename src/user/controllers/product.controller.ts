import { Controller, Get, Path, Route, Tags } from "tsoa";

import { Product, IProduct } from "../../models/product.model";
import { ResourceNotFoundError } from "../../models/error.model";

@Route("/api")
@Tags("User")
export class ProductController extends Controller {
  @Get("/products")
  public async getAllProduct(): Promise<IProduct[]> {
    const products = Product.find().sort("-createdAt").exec();
    return products;
  }

  @Get("/product/{id}")
  public async getProduct(@Path("id") id: string): Promise<IProduct | null> {
    const product = await Product.findOne({ _id: id });
    if (!product) {
      throw new ResourceNotFoundError("Product not found");
    }
    return product;
  }
}
