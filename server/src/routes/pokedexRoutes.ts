import { Router } from "express";
import * as pokedexController from "../controllers/pokedexController";

const pokedexRoutes = Router();

pokedexRoutes.get("/:page", pokedexController.index);

export default pokedexRoutes;
