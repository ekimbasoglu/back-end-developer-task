import express, { Application } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import logger from "./middleware/logger";

// Load environment variables from .env file
dotenv.config();

const app: Application = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(logger);

// Routes
import routes from "./routes";
app.use("/api", routes);

export default app;
