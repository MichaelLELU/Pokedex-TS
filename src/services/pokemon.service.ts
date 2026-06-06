import axios from "axios";
import { API_URL, CACHE_TTL } from "../constants/api";
import { mapPokemon } from "../mappers/pokemon.mapper";
import type { TyradexPokemon } from "../types/tyradex";

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
  .filter(
    (pokemon: TyradexPokemon) =>
      pokemon.pokedex_id && pokemon.name?.fr
  )
  .map(mapPokemon);

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