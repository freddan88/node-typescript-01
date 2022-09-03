import dotenv from "dotenv";
import express from "express";
import { errorMiddleware } from "./middlewares";
import { pokedexRoutes, userRoutes } from "./routes";

dotenv.config();

const server = express();

const port = process.env.PORT || 3005;

// Version: 1 Routes
{
  const prefix = "/api/v1";
  server.use(`${prefix}/pokedex`, pokedexRoutes);
  server.use(`${prefix}/users`, userRoutes);
}

server.use(errorMiddleware);

server.listen(port, () => console.log(`Server started on port: ${port}`));
