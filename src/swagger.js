import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "TP de groupe - Platefore de jeux vidéos",
            version: "1.0.0"
        }
    },
    apis: ["./src/routes/*.js"]
});