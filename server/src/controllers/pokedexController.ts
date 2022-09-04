import { Request as Req, Response as Res, NextFunction as Next } from "express";
import axios from "axios";
import { TCharacters } from "../utils/pokedexTypes";
import { API_BASE_URL, API_POKEMON_LIMIT } from "../utils/pokedexConstants";
import { getCharacterInfo } from "../utils/pokedexFunctions";
import { pokedexCache } from "../utils/pokedexFunctions";
import { TParams } from "../routes/pokedexRoutes";
import { CustomError } from "../utils/customError";
import { missingParam, serverError } from "../data/httpMessages";

export const index = (req: Req<TParams>, res: Res, next: Next) => {
  throw new CustomError(missingParam, ["page"]);
};

export const show = (req: Req<TParams>, res: Res, next: Next) => {
  const pageNumber = req.params.page ? +req.params.page : 0;
  if (pageNumber <= 0) throw new CustomError(missingParam, ["page"]);
  const cachedPage = pokedexCache.get(pageNumber);
  if (cachedPage) return res.status(200).json(cachedPage);
  const dataOffset = (pageNumber - 1) * API_POKEMON_LIMIT;
  const apiUrl = `${API_BASE_URL}?offset=${dataOffset}&limit=${API_POKEMON_LIMIT}`;
  axios
    .get<TCharacters>(apiUrl)
    .then((axiosRes) => getCharacterInfo(axiosRes.data, pageNumber))
    .then((data) => {
      pokedexCache.set({ cached: true, ...data });
      res.status(200).json({ cached: false, ...data });
    })
    .catch((err) => next({ ...serverError, error: err }));
};
