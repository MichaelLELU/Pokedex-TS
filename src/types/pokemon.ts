export interface PokemonType {
  name: string;
  image: string;
}

export interface Pokemon {
  id: number;
  pokedexId: number;
  name: string;
  image: string;
  apiTypes: PokemonType[];
  apiGeneration: number;
}

export interface PokemonSearch {
  id: number;
  name: string;
  sprite: string;
}

export interface PokemonEvolution {
  name: string;
  pokedexId: number;
}