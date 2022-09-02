import { Router } from "express";
import { pokedexCache } from "../utils/pokedexFunctions";
import * as pokedexController from "../controllers/pokedexController";

export type TParams = {
  page: string;
};

setInterval(() => pokedexCache.clear(), 300000); // Every 5 minute

const pokedexRoutes = Router();

pokedexRoutes.get("/:page", pokedexController.index);

export default pokedexRoutes;
