import { Router } from 'express'
import categoryRouter from './category.routes'
import productRouter from './product.routes'

const routes = Router()

routes.use(categoryRouter)
routes.use(productRouter)

export default routes
