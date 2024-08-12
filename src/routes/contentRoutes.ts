import { Router } from "express";
import contentController from "../controllers/contentController";

const router = Router();

// Create content
router.post("/", contentController.createContent);

// Read all content
router.get("/", contentController.getAllContent);

// Read specific content by ID
router.get("/:id", contentController.getContentById);

// Update content by ID
router.put("/:id", contentController.updateContentById);

// Delete content by ID
router.delete("/:id", contentController.deleteContentById);

export default router;
