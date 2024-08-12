import { Router } from "express";
import contentController from "../controllers/contentController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

// Create content
router.post("/", authMiddleware, contentController.createContent);

// Read all content
router.get("/", contentController.getAllContent);

// Read specific content by ID
router.get("/:id", contentController.getContentById);

// Update content by ID
router.put("/:id", authMiddleware, contentController.updateContentById);

// Delete content by ID
router.delete("/:id", authMiddleware, contentController.deleteContentById);

export default router;
