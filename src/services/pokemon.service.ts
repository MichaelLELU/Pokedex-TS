import axios from "axios";
import { API_URL, CACHE_TTL } from "../constants/api";

export async function getAllPokemons() {
  const cachedData = localStorage.getItem("pkmnData");
  const cachedTime = localStorage.getItem("cacheDate");

  const timestamp = Number(cachedTime);

  if (
    cachedData &&
    cachedTime &&
    timestamp + CACHE_TTL > Date.now()
  ) {
    return JSON.parse(cachedData);
  }

  localStorage.removeItem("pkmnData");
  localStorage.removeItem("cacheDate");

  const res = await axios.get(`${API_URL}/pokemon`);

  const formattedData = res.data
    .filter((pokemon: any) => pokemon.pokedex_id && pokemon.name?.fr)
    .map((pokemon: any) => ({
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

  localStorage.setItem(
    "pkmnData",
    JSON.stringify(formattedData)
  );

  localStorage.setItem(
    "cacheDate",
    Date.now().toString()
  );

  return formattedData;
}