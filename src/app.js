import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";
// import booksRouter from "./routes/books.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.json({ message: "API OK" }));
// app.use("/api/books", booksRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;