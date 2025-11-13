import { Router } from "express";
import {
    createGame,
    listGames,
    getGame,
    listUsers,
    listReviews,
    updateGame,
    deleteGame
} from "../controllers/games.controller.js";

const router = Router();

/**
* @openapi
* /api/games:
*     get:
*         summary: Get all games
*     post:
*         summary: Create a game
*/
router.get("/", listGames);
router.post("/", createGame);

/**
* @openapi
* /api/games/{id}:
*     get:
*         summary: Get game by id
*     put:
*         summary: Update game
*     delete:
*         summary: Delete game
*/
router.get("/:id", getGame);
router.put("/:id", updateGame);
router.delete("/:id", deleteGame);

/**
* @openapi
* /api/games/{id}/users:
*     get:
*         summary: Get all users by id
*/
router.get("/:id/users", listUsers);

/**
* @openapi
* /api/games/{id}/reviews:
*     get:
*         summary: Get all reviews by id
*/
router.get("/:id/reviews", listReviews);