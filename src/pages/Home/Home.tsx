import { useLoaderData } from "react-router-dom";

import PokemonCard from "../../component/PokemonCard";

import "./Home.css";

type PokemonType = {
  id: number;
  name: string;
  pokedexId: number;
  image: string;
  apiTypes: { name: string; image: string }[];
};

export default function Home() {
  const dataPokemon = useLoaderData() as PokemonType[];

  return (
    <div>
      <h1>Bienvenu Dresseur</h1>

      <div className="pokemon-container">
        {dataPokemon.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>
    </div>
  );
}
