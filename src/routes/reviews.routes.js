import { Router } from "express";
import {
    createReview,
    listReviews
} from "../controllers/reviews.controller.js";

const router = Router();

/**
* @openapi
* /api/reviews:
*     get:
*         summary: Get all reviews
*     post:
*         summary: Create a review
*/
router.get("/", listReviews);
router.post("/", createReview);

export default router;