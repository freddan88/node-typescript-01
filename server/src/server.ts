import express from "express";
import dotenv from "dotenv";
import pokedexRoutes from "./routes/pokedexRoutes";
import userRoutes from "./routes/userRoutes";
import { TReturnData } from "./utils/pokedexTypes";

dotenv.config();

const server = express();

const port = process.env.PORT || 3005;

export const savedCharacters: TReturnData[] = [];

setInterval(() => {
  console.log("Empty cache");
  savedCharacters.length = 0;
}, 300000); // Every 5 minute

server.use("/api/v1/pokedex", pokedexRoutes);
server.use("/api/v1/users", userRoutes);

server.listen(port, () => console.log(`Server started on port: ${port}`));
