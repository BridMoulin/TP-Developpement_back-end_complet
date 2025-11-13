// src/controllers/reviews.controller.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// CREATE : POST /api/reviews
export async function createReview(req, res) {
  const { recommended, text, language, userId, gameId } = req.body;

  try {
    const review = await prisma.review.create({
      data: {
        recommended,
        text,
        language,
        userId,
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
    res.status(500).json({ error: "Cannot list reviews" });
  }
}

// READ ONE : GET /api/reviews/:id
export async function getReview(req, res) {
  const { id } = req.params;

  try {
    const review = await prisma.review.findUnique({
      where: { id: Number(id) },
      include: {
        user: true,
        game: true,
      },
    });

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Cannot get review" });
  }
}

// UPDATE : PUT /api/reviews/:id
export async function updateReview(req, res) {
  const { id } = req.params;
  const { recommended, text, language } = req.body;

  try {
    const review = await prisma.review.update({
      where: { id: Number(id) },
      data: {
        recommended,
        text,
        language,
      },
      include: {
        user: true,
        game: true,
      },
    });

    res.json(review);
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: "Review not found" });
  }
}

// DELETE : DELETE /api/reviews/:id
export async function deleteReview(req, res) {
  const { id } = req.params;

  try {
    await prisma.review.delete({
      where: { id: Number(id) },
    });

    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: "Review not found" });
  }
}
