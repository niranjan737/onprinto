import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import * as dotenv from "dotenv";

import errorHandler from "./middleware/error-handler.middleware";

dotenv.config();

//DB Configuration
const dbConfig = require("./config/database.config");
// import * as dbConfig from "./config/database.config";
//const swaggerDocument = require('../swagger.json')
import routes from "./routes";
import { AddressInfo } from "net";
//import expressJSDocSwagger from 'express-jsdoc-swagger'

// create express app
const app = express();
//let router = express.Router()

app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

const startSwagger = () => {
  try {
    const swaggerDoc = require("../swagger.json");
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
  } catch (error) {
    console.log("Swagger Error ", error);
  }
};

startSwagger();

// Require routes
app.use("/api", routes);

app.get("/", function (req, res) {
  res.json({ message: "successfully! Running" });
});

app.use("/public/images", express.static("uploads"));
app.use(errorHandler);
//The 404 Route (ALWAYS Keep this as the last route)
app.get("/*", function (req, res) {
  res.status(404).json("Page Not Found");
});

console.log("process.env.PORT", process.env.PORT);

const port = process.env.PORT || 5000;
// listen for requests
const server = app.listen(port, function () {
  const serverAddress: AddressInfo = server.address() as AddressInfo;
  const { address, port } = serverAddress;
  console.log("Example app listening at http://%s:%s", address, port);
});
