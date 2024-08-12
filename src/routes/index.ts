import { Router } from "express";
import authRoutes from "./authRoutes";
import contentRoutes from "./contentRoutes";

const router = Router();

// Auth routes
router.use("/auth", authRoutes);

// Content routes
router.use("/content", contentRoutes);

export default router;
