import { ICharactersData, TCharacters, TReturnData } from "./pokedexTypes";
import { API_POKEMON_LIMIT } from "./pokedexConstants";
import { serverError } from "../data/httpMessages";
import { CustomError } from "./customError";
import axios from "axios";

class PokedexCache {
  collection: TReturnData[] = [];

  set(obj: TReturnData) {
    this.collection.push(obj);
  }

  get(pageNumber: number) {
    return this.collection.find((obj) => obj.page === pageNumber);
  }

  show() {
    console.log(this.collection);
  }

  clear() {
    if (this.collection.length > 0) {
      console.log("Removing saved pokemon-characters");
      this.collection.length = 0;
    }
  }
}

const getImage = (imgUrlA: string, imgUrlB: string) => {
  if (imgUrlA) return imgUrlA;
  return imgUrlB;
};

export const capitalizeFirst = (name: string) => {
  const firstCharacter = name.slice(0, 1);
  const restCharacters = name.slice(1, name.length);
  return firstCharacter.toUpperCase() + restCharacters;
};

export const getCharacterInfo = async (
  data: TCharacters,
  pageNumber: number
) => {
  const { count, results } = data;
  const totalPages = Math.ceil(count / API_POKEMON_LIMIT);
  const promises = results.map((obj) => axios.get<ICharactersData>(obj.url));
  const resolved = await Promise.all(promises);
  if (resolved.some((obj) => obj.status !== 200)) {
    throw new CustomError(serverError);
  }
  const characters = resolved.map((axiosRes) => {
    const { id, name, sprites, types } = axiosRes.data;
    const { other, front_default } = sprites;
    const image = getImage(other.dream_world.front_default, front_default);
    const modifiedName = capitalizeFirst(name);
    return {
      id,
      name: modifiedName,
      type: types[0].type.name,
      sprite: image,
    };
  });
  return { page: pageNumber, totalPages, characters };
};

export const pokedexCache = new PokedexCache();
