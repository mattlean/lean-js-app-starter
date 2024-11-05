import { Request, Response, Router } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import packageJson from "../../../../../package.json";

const router = Router();
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Notes API Docs",
      description: "A REST API backend for a notes app.",
      version: packageJson.version,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./**/*.ts"],
});

// Export Swagger specification in JSON format
router.get("/api.json", (req: Request, res: Response) => res.json(swaggerSpec));

// API documentation by Swagger
router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export { router as docsHandler };
