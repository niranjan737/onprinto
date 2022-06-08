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
import slugify from "slugify";

import {
  ResourceNotFoundError,
  ValidationFailedError,
} from "../models/error.model";
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
    const { name, description, parentId, status } = category;
    const categoryInput = {
      name,
      slug: slugify(name, { lower: true }),
    } as CategoryInput;

    if (typeof description != "undefined") {
      categoryInput.description = description;
    }

    if (typeof status != "undefined") {
      categoryInput.status = status;
    }

    if (typeof parentId != "undefined") {
      categoryInput.parentId = parentId;
      const parentCategory = await this.getCategoryBySlug(parentId);
      if (!parentCategory) {
        throw new ValidationFailedError("Parent Category not found");
      }
    }

    return Category.create(categoryInput);
  }

  @Put("/category/{id}/upload-image")
  public async uploadProductImage(
    @Path("id") id: string,
    @UploadedFile() image: string
  ): Promise<ICategory | null> {
    const productObj = await Category.findOne({ _id: id });
    if (!productObj) {
      throw new ResourceNotFoundError("Category not found");
    }

    const categoryInput: CategoryInput = productObj;

    if (typeof image != "undefined") {
      categoryInput.image = image;
    }
    await Category.updateOne({ _id: id }, categoryInput);
    return Category.findById(id);
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
    const { name, description, parentId, status } = category;

    const categoryObj = await Category.findOne({ _id: id });
    if (!categoryObj) {
      throw new ResourceNotFoundError("Category not found");
    }

    const categoryInput = {
      name,
      slug: slugify(name, { lower: true }),
    } as CategoryInput;

    if (typeof description != "undefined") {
      categoryInput.description = description;
    }

    if (typeof parentId != "undefined") {
      categoryInput.parentId = parentId;
      const parentCategory = await this.getCategoryBySlug(parentId);
      if (!parentCategory) {
        throw new ValidationFailedError("Parent Category not found");
      }
    }

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

  public async getCategoryBySlug(slug: string): Promise<ICategory | null> {
    return Category.findOne({ slug });
  }
}
