import axios from "axios";
import { API_URL } from "../constants/api";
import { mapPokemon } from "../mappers/pokemon.mapper";
import type { TyradexPokemon } from "../types/tyradex";

export async function getGeneration(id: string) {
  const res = await axios.get(`${API_URL}/gen/${id}`);

return res.data.map(
  (pokemon: TyradexPokemon) =>
    mapPokemon(pokemon)
);
}