import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";

import usersRoutes from "./routes/users.routes.js";
import gamesRoutes from "./routes/games.routes.js";
import reviewsRoutes from "./routes/reviews.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.json({ message: "API OK" }));

// API Routes
app.use("/api/users", usersRoutes);
app.use("/api/games", gamesRoutes);
app.use("/api/reviews", reviewsRoutes);

// Health
app.get("/api/status", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
});

// 404
app.use((req, res) => res.status(404).json({ error: "Unknown route" }));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;