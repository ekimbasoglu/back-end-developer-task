import express, { Application } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import logger from "./middleware/logger";
import connectDB from "./config/db";
import { setupSwagger } from "./config/swagger";

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app: Application = express();

// Set up Swagger
setupSwagger(app);

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(logger);

// Routes
import routes from "./routes";
app.use("/api", routes);

export default app;
