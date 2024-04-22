import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { Category } from "../entity/Category";

export class CategoryController extends Controller {
    repository = AppDataSource.getRepository(Category);
}