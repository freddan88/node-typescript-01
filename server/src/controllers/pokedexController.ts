import { Request as Req, Response as Res, NextFunction as Next } from "express";
import { missingParam, positiveParam, serverError } from "../data/httpMessages";
import { API_BASE_URL, API_POKEMON_LIMIT } from "../utils/pokedexConstants";
import { getCharacterInfo } from "../utils/pokedexFunctions";
import { pokedexCache } from "../utils/pokedexFunctions";
import { CustomError } from "../utils/customError";
import { TCharacters } from "../utils/pokedexTypes";
import { TParams } from "../routes/pokedexRoutes";
import axios from "axios";

export const index = (req: Req<TParams>, res: Res, next: Next) => {
  throw new CustomError(missingParam, ["page"]);
};

export const show = (req: Req<TParams>, res: Res, next: Next) => {
  const pageNumber = req.params.page ? +req.params.page : 0;
  if (pageNumber <= 0) throw new CustomError(positiveParam, ["page"]);
  const cachedPage = pokedexCache.get(pageNumber);
  if (cachedPage) return res.status(200).json(cachedPage);
  const dataOffset = (pageNumber - 1) * API_POKEMON_LIMIT;
  const apiUrl = `${API_BASE_URL}?offset=${dataOffset}&limit=${API_POKEMON_LIMIT}`;
  const nextUrl = `http://localhost:3005/api/v1/pokedex/${pageNumber + 1}`;
  const prevUrl = `http://localhost:3005/api/v1/pokedex/${pageNumber - 1}`;
  axios
    .get<TCharacters>(apiUrl)
    .then((axiosRes) => getCharacterInfo(axiosRes.data, pageNumber))
    .then((axiosData) => {
      const pages = axiosData.page + "/" + axiosData.totalPages;
      const next = pageNumber >= axiosData.totalPages ? "" : nextUrl;
      const prev = pageNumber === 1 ? "" : prevUrl;
      pokedexCache.set({ cached: true, next, prev, pages, ...axiosData });
      res.status(200).json({ cached: false, next, prev, pages, ...axiosData });
    })
    .catch((err) => next({ ...serverError, error: err }));
};
