import { Request, Response } from "express";
import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Put,
  Route,
  Tags,
  UploadedFile,
} from "tsoa";

import { Product, ProductInput, IProduct } from "../models/product.model";
import { ResourceNotFoundError } from "../models/error.model";

@Route("/api/admin")
@Tags("Admin")
export class ProductController extends Controller {
  @Get("/products")
  public async getAllProduct(): Promise<IProduct[]> {
    const products = Product.find().sort("-createdAt").exec();
    return products;
  }
  @Post("/product")
  public async createProduct(@Body() product: ProductInput): Promise<IProduct> {
    const {
      description,
      name,
      category,
      status,
      available,
      size,
      price,
      offerPrice,
      deliveryPrice,
    } = product;

    const productInput: ProductInput = {
      name,
      description,
    };

    if (typeof category != "undefined") {
      productInput.category = category;
    }
    if (typeof status != "undefined") {
      productInput.status = status;
    }
    if (typeof available != "undefined") {
      productInput.available = available;
    }
    if (typeof size != "undefined") {
      productInput.size = size;
    }
    if (typeof price != "undefined") {
      productInput.price = price;
    }
    if (typeof offerPrice != "undefined") {
      productInput.offerPrice = offerPrice;
    }
    if (typeof deliveryPrice != "undefined") {
      productInput.deliveryPrice = deliveryPrice;
    }

    return Product.create(productInput);
  }

  @Put("/product/{id}/upload-image")
  public async uploadProductImage(
    @Path("id") id: string,
    @UploadedFile() image: string
  ): Promise<IProduct | null> {
    const productObj = await Product.findOne({ _id: id });
    if (!productObj) {
      throw new ResourceNotFoundError("Product not found");
    }

    const productInput: ProductInput = productObj;

    if (typeof image != "undefined") {
      productInput.image = image;
    }
    await Product.updateOne({ _id: id }, productInput);
    return Product.findById(id);
  }

  @Get("/product/{id}")
  public async getProduct(@Path("id") id: string): Promise<IProduct | null> {
    const product = await Product.findOne({ _id: id });
    if (!product) {
      throw new ResourceNotFoundError("Product not found");
    }
    return product;
  }

  @Put("/product/{id}")
  public async updateProduct(
    @Path("id") id: string,
    @Body() product: ProductInput
  ): Promise<IProduct | null> {
    const {
      description,
      category,
      name,
      status,
      available,
      size,
      price,
      offerPrice,
      deliveryPrice,
    } = product;

    const productObj = await Product.findOne({ _id: id });
    if (!productObj) {
      throw new ResourceNotFoundError("Product not found");
    }

    const productInput: ProductInput = {
      name,
      description,
    };

    if (typeof category != "undefined") {
      productInput.category = category;
    }
    if (typeof status != "undefined") {
      productInput.status = status;
    }
    if (typeof available != "undefined") {
      productInput.available = available;
    }
    if (typeof size != "undefined") {
      productInput.size = size;
    }
    if (typeof price != "undefined") {
      productInput.price = price;
    }
    if (typeof offerPrice != "undefined") {
      productInput.offerPrice = offerPrice;
    }
    if (typeof deliveryPrice != "undefined") {
      productInput.deliveryPrice = deliveryPrice;
    }

    await Product.updateOne({ _id: id }, productInput);
    return Product.findById(id);
  }

  @Delete("/product/{id}")
  public async deleteProduct(@Path("id") id: string): Promise<IProduct | null> {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      throw new ResourceNotFoundError("Product not found to delete");
    }
    return product;
  }
}
