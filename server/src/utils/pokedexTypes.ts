export type TCharacter = {
  name: string;
  url: string;
};

export type TCharacters = {
  results: TCharacter[];
  previous: string | null;
  next: string | null;
  count: number;
};

export type ICharactersData = {
  id: number;
  name: string;
  types: [
    {
      type: {
        name: string;
      };
    }
  ];
  sprites: {
    front_default: string;
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
};

export type TReturnCharacter = {
  id: number;
  name: string;
  type: string;
  sprite: string;
};

export type TReturnData = {
  next: string;
  prev: string;
  page: number;
  cached: boolean;
  totalPages: number;
  characters: TReturnCharacter[];
};
