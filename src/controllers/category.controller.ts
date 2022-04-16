import { Request, Response } from "express";

import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Put,
  Query,
  Route,
  SuccessResponse,
  Tags,
} from "tsoa";

import { CustomError, ResourceNotFoundError } from "../models/error.model";
import { Category, CategoryInput, ICategory } from "../models/category.model";

@Route("/api/admin")
@Tags("Admin")
export class CategoryController extends Controller {
  @Get("/categories")
  public async getAllCategory(): Promise<ICategory[]> {
    const categories = Category.find().sort("-createdAt").exec();
    return categories;
  }
  @Post("/category")
  public async createCategory(
    @Body() category: CategoryInput
  ): Promise<ICategory> {
    const { description, name, status } = category;

    const categoryInput: CategoryInput = {
      name,
      description,
    };

    if (typeof status != "undefined") {
      categoryInput.status = status;
    }

    return Category.create(categoryInput);
  }

  @Get("/category/{id}")
  public async getCategory(@Path("id") id: string): Promise<ICategory | null> {
    const category = await Category.findOne({ _id: id });
    if (!category) {
      throw new ResourceNotFoundError("Category not found");
    }
    return category;
  }

  @Put("/category/{id}")
  public async updateCategory(
    @Path("id") id: string,
    @Body() category: CategoryInput
  ): Promise<ICategory | null> {
    const { description, name, status } = category;

    const categoryObj = await Category.findOne({ _id: id });
    if (!categoryObj) {
      throw new ResourceNotFoundError("Category not found");
    }

    const categoryInput: CategoryInput = {
      name,
      description,
    };

    if (typeof status != "undefined") {
      categoryInput.status = status;
    }

    await Category.updateOne({ _id: id }, categoryInput);
    return Category.findById(id);
  }

  @Delete("/category/{id}")
  public async deleteCategory(
    @Path("id") id: string
  ): Promise<ICategory | null> {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      throw new ResourceNotFoundError("Category not found to delete");
    }
    return category;
  }
}
