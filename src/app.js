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

app.use("/api/users", usersRoutes);
app.use("/api/games", gamesRoutes);
app.use("/api/reviews", reviewsRoutes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;