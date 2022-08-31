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
