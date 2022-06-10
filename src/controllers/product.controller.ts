import { Request, Response } from "express";
import { Types } from "mongoose";
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

import {
  Product,
  ProductInput,
  IProduct,
  ProductOutput,
} from "../models/product.model";
import {
  ProductImage,
  IProductImage,
  ProductImageInput,
} from "../models/productImage.model";
import { ResourceNotFoundError } from "../models/error.model";

@Route("/api/admin")
@Tags("Admin")
export class ProductController extends Controller {
  @Get("/products")
  public async getAllProduct(): Promise<ProductOutput[]> {
    const products = Product.aggregate([
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
  @Post("/product")
  public async createProduct(
    @Body() product: ProductInput
  ): Promise<ProductOutput> {
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

    const productInput = productObj;

    if (typeof image != "undefined") {
      productInput.image = image;
    }
    await Product.updateOne({ _id: id }, productInput);
    return Product.findById(id);
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

  @Put("/product/{id}")
  public async updateProduct(
    @Path("id") id: string,
    @Body() product: ProductInput
  ): Promise<ProductOutput | null> {
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
  public async deleteProduct(
    @Path("id") id: string
  ): Promise<ProductOutput | null> {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      throw new ResourceNotFoundError("Product not found to delete");
    }
    return product;
  }

  @Get("/product/{id}/images")
  public async getProductImages(
    @Path("id") productId: string
  ): Promise<IProductImage[]> {
    const productImages = ProductImage.find({ productId: productId }).exec();
    return productImages || [];
  }

  @Post("/product/{id}/image")
  public async uploadProductImages(
    @Path("id") productId: string,
    @UploadedFile() image: string
  ): Promise<IProduct | null> {
    const productObj = await Product.findOne({ _id: productId });
    if (!productObj) {
      throw new ResourceNotFoundError("Product not found");
    }

    const productImageInput: ProductImageInput = {
      name: image,
      productId: productId,
    };
    return ProductImage.create(productImageInput);
  }

  @Delete("/product/{id}/image/{imageId}")
  public async deleteProductImage(
    @Path("id") productId: string,
    @Path("imageId") imageId: string
  ): Promise<IProduct | null> {
    const image = await ProductImage.findByIdAndDelete(imageId);
    if (!image) {
      throw new ResourceNotFoundError("Image not found to delete");
    }
    return image;
  }
}
