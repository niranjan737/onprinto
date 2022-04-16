import { Router } from 'express'
import categoryRouter from './category.routes'
import productRouter from './product.routes'
import pingRouter from './ping.routes'

const routes = Router()

routes.use(categoryRouter)
routes.use(productRouter)
routes.use(pingRouter)

export default routes
