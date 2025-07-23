import { useLoaderData, useParams } from "react-router-dom";
import PokemonCard, { poketype } from "../../component/PokemonCard";
import "./TypePage.css";

export default function TypePage() {
  const type = useParams();
  const pokemons = useLoaderData() as poketype[];

  return (
    <>
      <h1>{type.name} : {pokemons.length} Pokémon</h1>
      <div className="pokemon-container">
        {pokemons.map((p) => (
          <PokemonCard key={p.id} creature={p} />
        ))}
      </div>
    </>
  );
}
