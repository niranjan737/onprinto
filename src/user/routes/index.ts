import { Router } from "express";
import categoryRouter from "./category.routes";
import productRouter from "./product.routes";
import authRouter from "./auth.routes";

const routes = Router();

routes.use(categoryRouter);
routes.use(productRouter);
routes.use(authRouter);

export default routes;
