import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'

//DB Configuration
const dbConfig = require('./config/database.config')
// import * as dbConfig from "./config/database.config";
const swaggerDocument = require('../swagger.json')
import routes from './routes'
import { AddressInfo } from 'net'

// create express app
const app = express()
let router = express.Router()

app.use(cors())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API for JSONPlaceholder',
      version: '1.0.0',
      servers: ['localhost:3030'],
      host: 'localhost:3030',
    },
  },
  apis: ['**/*.ts'],
}
const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

// Require routes
app.use('/api', routes)

app.get('/', function (req, res) {
  res.json({ message: 'successfully! Running' })
})

//The 404 Route (ALWAYS Keep this as the last route)
app.get('/*', function (req, res) {
  res.status(404).json('Page Not Found')
})

// listen for requests
const server = app.listen(3030, function () {
  const serverAddress: AddressInfo = server.address() as AddressInfo
  const { address, port } = serverAddress
  console.log('Example app listening at http://%s:%s', address, port)
})
