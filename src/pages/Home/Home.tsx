import { useLoaderData } from "react-router-dom";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import SearchBar from "../../components/SearchBar";

import type { Pokemon } from "../../types/pokemon";
import "./Home.css";


export default function Home() {
  const dataPokemon = useLoaderData() as Pokemon[];

  return (
    <>
      <h1>Bienvenue Dresseur ({dataPokemon.length} Pokémon)</h1>
      <SearchBar
        pokemons={dataPokemon.map((p) => ({
          id: p.id,
          name: p.name,
          sprite: p.image,
        }))}
      />
      <div className="pokemon-container">
        {dataPokemon.map((p) => (
          <PokemonCard key={p.id} creature={p} />
        ))}
      </div>
    </>
  );
}
