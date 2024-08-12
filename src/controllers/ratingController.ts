// src/controllers/ratingController.ts

import { Request, Response } from "express";
import Rating from "../models/ratingModel";

interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

// Rate content (create or update rating)
const rateContent = async (req: AuthRequest, res: Response): Promise<void> => {
  const { content, rating } = req.body;
  const userId = req.user?.id; // Safely access user ID

  if (!userId) {
    res.status(401).json({ message: "User not authenticated" });
    return;
  }

  if (rating < 1 || rating > 5) {
    res.status(400).json({ message: "Rating must be between 1 and 5 stars" });
    return;
  }

  try {
    const existingRating = await Rating.findOne({ user: userId, content });

    if (existingRating) {
      existingRating.rating = rating;
      await existingRating.save();
      res
        .status(200)
        .json({ message: "Rating updated successfully", existingRating });
    } else {
      const newRating = await Rating.create({ user: userId, content, rating });
      res
        .status(201)
        .json({ message: "Rating created successfully", newRating });
    }
  } catch (error) {
    res.status(500).json({ message: "Error processing rating", error });
  }
};

// Get all ratings for a specific content item
const getRatingsByContent = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { contentId } = req.params;

  try {
    const ratings = await Rating.find({ content: contentId }).populate(
      "user",
      "username"
    );
    res
      .status(200)
      .json({ message: "Ratings retrieved successfully", ratings });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving ratings", error });
  }
};

// Get all ratings by a specific user
const getRatingsByUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    const ratings = await Rating.find({ user: userId }).populate(
      "content",
      "title"
    );
    res
      .status(200)
      .json({ message: "Ratings retrieved successfully", ratings });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving ratings", error });
  }
};

export default {
  rateContent,
  getRatingsByContent,
  getRatingsByUser,
};
