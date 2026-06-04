import axios from "axios";
import { API_URL } from "../constants/api";

export async function getGeneration(id: string) {
  const res = await axios.get(`${API_URL}/gen/${id}`);

  return res.data.map((pokemon: any) => ({
    id: pokemon.pokedex_id,
    pokedexId: pokemon.pokedex_id,
    name: pokemon.name.fr,
    image: pokemon.sprites?.regular || "",
    apiTypes:
      pokemon.types?.map((type: any) => ({
        name: type.name,
        image: type.image,
      })) || [],
    apiGeneration: pokemon.generation,
  }));
}