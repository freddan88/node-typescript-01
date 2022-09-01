import axios from "axios";
import { API_POKEMON_LIMIT } from "./pokedexConstants";
import { ICharactersData, TCharacters } from "./pokedexTypes";

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
  const characters = resolved.map((apiRes) => {
    const { other, front_default } = apiRes.data.sprites;
    const image = other.dream_world.front_default
      ? other.dream_world.front_default
      : front_default;
    const { id, name } = apiRes.data;
    const modifiedName = capitalizeFirst(name);
    return {
      id,
      name: modifiedName,
      type: apiRes.data.types[0].type.name,
      sprite: image,
    };
  });
  return { page: pageNumber, totalPages, characters };
};
