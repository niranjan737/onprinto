import { Router } from "express";
import categoryRouter from "./category.routes";
import productRouter from "./product.routes";
import userRouter from "../user/routes";

const routes = Router();

routes.use(categoryRouter);
routes.use(categoryRouter);
routes.use(userRouter);

export default routes;
