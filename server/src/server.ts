import pokedexRoutes from "./routes/pokedexRoutes";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const server = express();

const port = process.env.PORT || 3002;

server.use("/api/v1/pokedex", pokedexRoutes);

server.listen(port, () => console.log(`Server started on port: ${port}`));
