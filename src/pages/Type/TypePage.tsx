import { useLoaderData, useParams } from "react-router-dom";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import SearchBar from "../../components/SearchBar";
import type { Pokemon } from "../../types/pokemon";
import "./TypePage.css";

export default function TypePage() {
  const type = useParams();
  const pokemons = useLoaderData() as Pokemon[];

  return (
    <>
      <h1>{type.name} : {pokemons.length} Pokémon</h1>
      <SearchBar
        pokemons={pokemons.map((p) => ({
          id: p.id,
          name: p.name,
          sprite: p.image,
        }))}
      />
      <div className="pokemon-container">
        {pokemons.map((p) => (
          <PokemonCard key={p.id} creature={p} />
        ))}
      </div>
    </>
  );
}
