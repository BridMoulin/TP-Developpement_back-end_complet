// src/controllers/reviews.controller.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// CREATE : POST /api/reviews
export async function createReview(req, res) {
  const { recommended, text, language, authorId, gameId } = req.body;

  try {
    const review = await prisma.review.create({
      data: {
        recommended,
        text,
        language,
        authorId,
        gameId,
      },
      include: {
        user: true,
        game: true,
      },
    });

    res.status(201).json(review);
  } catch (err) {
    console.error(err);
    res.status(400).json({
      error: "Cannot create review",
      details: err.message,
    });
  }
}

// READ ALL : GET /api/reviews
export async function listReviews(req, res) {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        user: true,
        game: true,
      },
    });
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: "Reviews not found" });
  }
}