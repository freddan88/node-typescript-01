import express, { Request as Req, Response as Res } from "express";
import axios from "axios";
import dotenv from "dotenv";
import { ICharactersData, TCharacters, TReturnData } from "./types";

dotenv.config();

const server = express();

const apiPokemonLimit = 9;

const apiBaseUrl = "https://pokeapi.co/api/v2/pokemon";

const port = process.env.PORT || 3002;

const savedCharacters: TReturnData[] = [];

const getCharacterInfo = async (data: TCharacters, pageNumber: number) => {
  const { count, results } = data;
  const totalPages = Math.ceil(count / apiPokemonLimit);
  const promises = results.map((obj) => axios.get<ICharactersData>(obj.url));
  const resolved = await Promise.all(promises);
  const characters = resolved.map((apiRes) => {
    const { other, front_default } = apiRes.data.sprites;
    const image = other.dream_world.front_default
      ? other.dream_world.front_default
      : front_default;
    return {
      id: apiRes.data.id,
      name: apiRes.data.name,
      type: apiRes.data.types[0].type.name,
      sprite: image,
    };
  });
  return { page: pageNumber, totalPages, characters };
};

server.get("/api/pokedex/:page", (req: Req<{ page: string }>, res: Res) => {
  const pageNumber = req.params.page ? +req.params.page : 0;
  if (pageNumber <= 0)
    return res.status(500).json("An error occurred status: 500");
  const cachedPage = savedCharacters.find((obj) => obj.page === pageNumber);
  if (cachedPage) return res.status(200).json(cachedPage);
  const dataOffset = (pageNumber - 1) * apiPokemonLimit;
  const apiUrl = `${apiBaseUrl}?offset=${dataOffset}&limit=${apiPokemonLimit}`;
  axios
    .get<TCharacters>(apiUrl)
    .then((apiRes) => getCharacterInfo(apiRes.data, pageNumber))
    .then((data) => {
      savedCharacters.push({ cached: true, ...data });
      res.status(200).json({ cached: false, ...data });
    })
    .catch((err) => console.log(err));
});

server.listen(port, () => console.log(`Server started on port: ${port}`));
