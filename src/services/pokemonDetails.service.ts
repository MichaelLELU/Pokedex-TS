import axios from "axios";
import { API_URL } from "../constants/api";

export async function getPokemonById(id: string) {
  const res = await axios.get(`${API_URL}/pokemon/${id}`);

  const pokemon = res.data;

  return {
    name: pokemon.name.fr,
    pokedexId: pokemon.pokedex_id,
    image: pokemon.sprites?.regular || "",
    shinyImage: pokemon.sprites?.shiny || "",
    apiGeneration: pokemon.generation,
    height: pokemon.height,
    weight: pokemon.weight,
    catchRate: pokemon.catch_rate,

    apiTypes:
      pokemon.types?.map((type: any) => ({
        name: type.name,
        image: type.image,
      })) || [],

    apiEvolutions:
      pokemon.evolution?.next?.map((evo: any) => ({
        name: evo.name,
        pokedexId: evo.pokedex_id,
        condition: evo.condition,
      })) || [],

    apiPreEvolution: 
      pokemon.evolution?.pre?.map((evo: any) => ({
        name: evo.name,
        pokedexId: evo.pokedex_id,
        condition: evo.condition,
      })) || [],

    stats: pokemon.stats,
  };
}