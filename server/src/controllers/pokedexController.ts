import { Request as Req, Response as Res } from "express";
import axios from "axios";
import { TCharacters } from "../utils/pokedexTypes";
import { API_BASE_URL, API_POKEMON_LIMIT } from "../utils/pokedexConstants";
import { getCharacterInfo } from "../utils/pokedexFunctions";
import { savedCharacters } from "../server";

export const index = (req: Req, res: Res) => {
  const pageNumber = req.params.page ? +req.params.page : 0;
  if (pageNumber <= 0)
    return res.status(500).json("An error occurred status: 500");
  const cachedPage = savedCharacters.find((obj) => obj.page === pageNumber);
  if (cachedPage) return res.status(200).json(cachedPage);
  const dataOffset = (pageNumber - 1) * API_POKEMON_LIMIT;
  const apiUrl = `${API_BASE_URL}?offset=${dataOffset}&limit=${API_POKEMON_LIMIT}`;
  axios
    .get<TCharacters>(apiUrl)
    .then((apiRes) => getCharacterInfo(apiRes.data, pageNumber))
    .then((data) => {
      savedCharacters.push({ cached: true, ...data });
      res.status(200).json({ cached: false, ...data });
    })
    .catch((err) => console.log(err));
};
