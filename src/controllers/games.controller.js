// src/controllers/games.controller.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// CREATE : POST /api/games
export async function createGame(req, res) {
  const {
    title,
    developer,
    editor,
    releaseDate,
    description,
    languages,
    genres,
  } = req.body;

  try {
    const game = await prisma.game.create({
      data: {
        title,
        developer,
        editor,
        releaseDate: new Date(releaseDate),
        description,
        languages,
        genres,
      },
    });

    res.status(201).json(game);
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({ error: "Cannot create game", details: err.message });
  }
}

// READ ALL : GET /api/games
export async function listGames(req, res) {
  try {
    const games = await prisma.game.findMany();
    res.json(games);
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: "Games not found" });
  }
}

// READ : GET USERS
export async function listUsers(req, res) {
  const { id } = req.params;                        // Cherche le paramettre ID dans la requette api
  const user = await prisma.user.findMany({        // Cherche plusieurs jeux
    where: { game: { id: Number(id) } },           // Condition qui dit l'utilisateur possède l'ID en parametre 
  });
  if (!reviews) return res.status(404).json({ error: "Reviews not found" });
  res.json(reviews);
}

// READ : GET REVIEW
export async function listReviews(req, res) {
  const { id } = req.params;
  const reviews = await prisma.review.findMany({
    where: { gameId: Number(id) },
  });
  if (!reviews) return res.status(404).json({ error: "Reviews not found" });
  res.json(reviews);
}

// READ ONE : GET /api/games/:id
export async function getGame(req, res) {
  const { id } = req.params;

  try {
    const game = await prisma.game.findUnique({
      where: { id: Number(id) },
    });

    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    res.json(game);
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: "Game not found" });
  }
}

// UPDATE : PUT /api/games/:id
export async function updateGame(req, res) {
  const { id } = req.params;
  const {
    title,
    developer,
    editor,
    releaseDate,
    description,
    languages,
    genres,
  } = req.body;

  try {
    const game = await prisma.game.update({
      where: { id: Number(id) },
      data: {
        title,
        developer,
        editor,
        description,
        languages,
        genres,
        // on ne change la date que si elle est fournie
        ...(releaseDate && { releaseDate: new Date(releaseDate) }),
      },
    });

    res.json(game);
  } catch (err) {
    console.error(err);
    // en général si update plante sur l'id => jeu non trouvé
    res.status(404).json({ error: "Game not found" });
  }
}

// DELETE : DELETE /api/games/:id
export async function deleteGame(req, res) {
  const { id } = req.params;

  try {
    await prisma.game.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: "Game not found" });
  }
}
