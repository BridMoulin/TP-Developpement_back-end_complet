import { Router } from "express";
import {
    createUser,
    listUsers,
    getUser,
    listGames,
    listReviews,
    getReview,
    updateUser,
    updateWallet,
    updateReview,
    deleteUser,
    deleteReview
} from "../controllers/users.controller.js";

const router = Router();

/**
* @openapi
* /api/users:
*     get:
*         summary: Get all users
*     post:
*         summary: Create a user
*/
router.get("/", listUsers);
router.post("/", createUser);

/**
* @openapi
* /api/users/{id}:
*     get:
*         summary: Get user by id
*     put:
*         summary: Update user
*     delete:
*         summary: Delete user
*/
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

/**
* @openapi
* /api/user/{id}/wallet:
*     put:
*         summary: Update user's wallet
*/
router.put("/:id/wallet", updateWallet);

/**
* @openapi
* /api/user/{id}/games:
*     get:
*         summary: Get all games by id
*/
router.put("/:id/games", listGames);

/**
* @openapi
* /api/users/{id}/reviews:
*     get:
*         summary: Get all reviews by authorId
*/
router.get("/:id/reviews", listReviews);

/**
* @openapi
* /api/users/{authorId}/reviews/{gameId}:
*     get:
*         summary: Get review by authorId and gameId
*     put:
*         summary: Update review
*     delete:
*         summary: Delete review
*/
router.get("/:authorId/reviews/:gameId", getReview);
router.put("/:authorId/reviews/:gameId", updateReview);
router.delete("/:authorId/reviews/:gameId", deleteReview);

export default router;