import express from "express";
import dotenv from "dotenv";
import pokedexRoutes from "./routes/pokedexRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const server = express();

const port = process.env.PORT || 3005;

server.use("/api/v1/pokedex", pokedexRoutes);
server.use("/api/v1/users", userRoutes);

server.listen(port, () => console.log(`Server started on port: ${port}`));
