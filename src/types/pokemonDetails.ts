import type { PokemonEvolution } from "./pokemon";
import type { Stats } from "./stats";

export interface PokemonDetails {
  name: string;
  pokedexId: number;
  image: string;
  shinyImage: string;
  height: string;
  weight: string;
  catchRate: number;

  apiGeneration: number;

  apiTypes: {
    name: string;
    image: string;
  }[];

  apiEvolutions: PokemonEvolution[];

  apiPreEvolution: PokemonEvolution[]

  stats: Stats;
}