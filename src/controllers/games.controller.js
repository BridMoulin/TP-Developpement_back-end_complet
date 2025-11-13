import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// CREATE
export async function createUser(req, res) {
  const { name, mail, password, wallet } = req.body;
  try {
    const user = await prisma.user.create({
      data: { name, mail, password, wallet },
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

// UPDATE
export async function updateUser(req, res) {
  const { id } = req.params;
  const { name, mail, password, wallet } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, mail, password, wallet },
    });
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: "User not found" });
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
