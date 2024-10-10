import { useLoaderData, useParams } from "react-router-dom";
import PokemonCard, { poketype } from "../../component/PokemonCard";

export default function GenerationPage() {
  const params = useParams();
  const pokemons = useLoaderData() as poketype[];

  return (
    <>
      <h1>
        <strong> generation {params.id} </strong>: {pokemons.length} Pokémon
      </h1>
      <div className="pokemon-container">
        {pokemons.map((p) => (
          <PokemonCard key={p.id} creature={p} />
        ))}
      </div>
    </>
  );
}
