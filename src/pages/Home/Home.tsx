import { useLoaderData } from "react-router-dom";
import PokemonCard, { poketype } from "../../component/PokemonCard";
import "./Home.css";
import SearchBar from "../../component/SearchBar";

export default function Home() {
  const dataPokemon = useLoaderData() as poketype[];

  return (
    <>
      <h1>Bienvenue Dresseur</h1>
      <SearchBar />
      <div className="pokemon-container">
        {dataPokemon.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>
    </>
  );
}
//todo trouver les bon type pour les props
