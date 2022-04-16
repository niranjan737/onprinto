import mongoose from "mongoose";

import { config } from "./config";

mongoose.Promise = global.Promise;

const { dbUrl } = config;

// Connecting to the database
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });
