import type { TyradexPokemon } from "../types/tyradex";

export function mapPokemon(pokemon: TyradexPokemon) {
  return {
    id: pokemon.pokedex_id,
    pokedexId: pokemon.pokedex_id,
    name: pokemon.name.fr,
    image: pokemon.sprites?.regular || "",

    apiTypes:
      pokemon.types?.map((type) => ({
        name: type.name,
        image: type.image,
      })) || [],

    apiGeneration: pokemon.generation,
  };
}