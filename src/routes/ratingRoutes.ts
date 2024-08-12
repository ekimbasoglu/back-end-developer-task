import { Router } from "express";
import ratingController from "../controllers/ratingController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

// Route to create or update a rating
router.post("/", authMiddleware, ratingController.rateContent);

// Get all ratings for a specific content item
router.get("/content/:contentId", ratingController.getRatingsByContent);

// Get all ratings by a specific user
router.get("/user/:userId", ratingController.getRatingsByUser);

export default router;
