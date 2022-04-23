import { Controller, Get, Path, Route, Tags } from "tsoa";

import { ResourceNotFoundError } from "../../models/error.model";
import { Category, ICategory } from "../../models/category.model";

@Route("/api")
@Tags("User")
export class CategoryController extends Controller {
  @Get("/categories")
  public async getAllCategory(): Promise<ICategory[]> {
    const query = { status: 1 };
    const categories = Category.find(query).sort("-createdAt").exec();
    return categories;
  }

  @Get("/category/{id}")
  public async getCategory(@Path("id") id: string): Promise<ICategory | null> {
    const category = await Category.findOne({ _id: id });
    if (!category) {
      throw new ResourceNotFoundError("Category not found");
    }
    return category;
  }
}
