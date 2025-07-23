import { useLoaderData, useParams } from "react-router-dom";
import PokemonCard, { poketype } from "../../component/PokemonCard";

type GenerationParams = { id?: string };

export default function GenerationPage() {
  const { id } = useParams<GenerationParams>();
  const pokemons = useLoaderData() as poketype[];

  // On traduit le numéro en nom lisible
  let generationName = "Inconnue";
  switch (id) {
    case "1":
      generationName = "Kanto";
      break;
    case "2":
      generationName = "Johto";
      break;
    case "3":
      generationName = "Hoenn";
      break;
    case "4":
      generationName = "Sinnoh";
      break;
    case "5":
      generationName = "Unys";
      break;
    case "6":
      generationName = "Kalos";
      break;
    case "7":
      generationName = "Alola";
      break;
    case "8":
      generationName = "Galar";
      break;
  }


  return (
    <>
      <h1>
        <strong>
          Génération {id} — {generationName}
        </strong>{" "}
        : {pokemons.length} Pokémon
      </h1>

      <div className="pokemon-container">
        {pokemons.map((p) => (
          <PokemonCard key={p.id} creature={p} />
        ))}
      </div>
    </>
  );
}
