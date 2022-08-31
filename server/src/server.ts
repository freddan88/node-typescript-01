import express, { Request, Response } from "express";
import dotenv from "dotenv";
import axios, { AxiosResponse } from "axios";

type TCharacter = {
  name: string;
  url: string;
};

type TCharacters = {
  results: TCharacter[];
  previous: string | null;
  next: string | null;
  count: number;
};

dotenv.config();

const server = express();

const port = process.env.PORT || 3001;

const pokedexCache = {
  count: 0,
  next: "",
  previous: "",
  characters: [],
};

const apiBaseUrlSetting = "https://pokeapi.co/api/v2/pokemon";
const apiPerPageSetting = 9;

const getCharacters = async (dataOffset: number) => {
  try {
    const apiUrl = `${apiBaseUrlSetting}?offset=${dataOffset}&limit=${apiPerPageSetting}`;
    const apiRes: AxiosResponse<TCharacters> = await axios.get(apiUrl);
    if (apiRes.status !== 200) throw new Error(`Status: ${apiRes.status}`);
    return apiRes.data;
  } catch (error) {
    console.error(error);
  }
};

const getCharactersInfo = async (
  characters: TCharacter[],
  page: number,
  cb: any
) => {
  const characterPromises = characters.map((character) =>
    axios.get(character.url)
  );
  const charactersInfo = await Promise.all(characterPromises);
  const charactersModified = charactersInfo.map((characterInfo) => {
    const { other, front_default } = characterInfo.data.sprites;
    const image = other.dream_world.front_default
      ? other.dream_world.front_default
      : front_default;
    return {
      page,
      id: characterInfo.data.id,
      name: characterInfo.data.name,
      type: characterInfo.data.types[0].type.name,
      sprite: image,
    };
  });
  cb(charactersModified);
};

const handleData = (data: any) => {
  console.log(data);
};

server.get(
  "/api/pokedex/:page",
  (req: Request<{ page: number }>, res: Response) => {
    const page = req.params.page;

    if (page > 0) {
      const dataOffset = (page - 1) * apiPerPageSetting;
      const apiData = getCharacters(dataOffset);
      apiData.then((data) => {
        if (data) {
          getCharactersInfo(data.results, page, handleData);
          res.status(200).json(pokedexCache);
        }
      });
    } else {
      res.status(500).json("Page needs to be a number from 1");
    }
  }
);

server.listen(port, () => console.log(`Server started on port: ${port}`));
