import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// CREATE
export async function createUser(req, res) {
  const { name, mail, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: { name, mail, password },
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: "Cannot create user", details: err.message });
  }
}

// READ ALL
export async function listUsers(req, res) {
  const users = await prisma.user.findMany();
  res.json(users);
}

// READ ONE
export async function getUser(req, res) {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
  });
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
}

// READ ONE REVIEW
export async function getReview(req, res) {
  const { authorId, gameId } = req.params;
  const review = await prisma.review.findUnique({
    where: { AND: [{authorId: Number(authorId)}, {gameId: Number(gameId)}]},
  });
  if (!review) return res.status(404).json({ error: "Review not found" });
  res.json(review);
}

// READ ALL REVIEWS
export async function listReviews(req, res) {
  const { id } = req.params;
  const reviews = await prisma.review.findMany({
    where: { authorId: Number(id) },
  });
  if (!reviews) return res.status(404).json({ error: "Reviews not found" });
  res.json(reviews);
}

// READ ALL GAMES
export async function listGames(req, res) {
  const { id } = req.params;                        // Cherche le paramettre ID dans la requette api
  const games = await prisma.game.findMany({        // Cherche plusieurs jeux
    where: { users: { id: Number(id) } },           // Condition qui dit l'utilisateur possède l'ID en parametre 
  });
  if (!reviews) return res.status(404).json({ error: "Reviews not found" });
  res.json(reviews);
}

// UPDATE
export async function updateUser(req, res) {
  const { id } = req.params;
  const { name, mail, password, wallet } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, mail, password },
    });
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: "User not found" });
  }
}

// UPDATE WALLET
export async function updateWallet(req, res) {
  const { id } = req.params;
  const { wallet } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { wallet },
    });
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: "User not found" });
  }
}

// UPDATE REVIEW
export async function updateReview(req, res) {
  const { authorId, gameId } = req.params;
  const { recommended, text, language, } = req.body
  try {
    const review = await prisma.review.update({
      where: { AND: [{ authorId: Number(authorId) }, { gameId: Number(gameId) }] },
      data: { recommended, text, language, },
    });
    res.json(review);
  } catch (err) {
    res.status(404).json({ error: "Review not found" });
  }
}

// DELETE
export async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id: Number(id) } });
    res.status(204).end();
  } catch (err) {
    res.status(404).json({ error: "User not found" });
  }
}

// DELETE REVIEW
export async function deleteReview(req, res) {
  const { authorId, gameId } = req.params;
  try {
    await prisma.review.delete({where: { AND: [{authorId: Number(authorId)}, {gameId: Number(gameId)}]},})
  } catch (err) {
    res.status(404).json({ error: "Review not found"})
  }
}
