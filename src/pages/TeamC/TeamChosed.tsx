import { useLoaderData } from "react-router-dom";
import { poketype } from "../../component/PokemonCard";
import PokemonCard from "../../component/PokemonCard";
import { useEffect, useState } from "react";
import DefensiveCoverageButton from "../../component/defenciveCoverageButton/DefensiveCoverageButton";

const TEAM_KEY = "pokemonTeamIds";

export default function TeamChosed() {
  const dataPokemon = useLoaderData() as poketype[];
  const [teamIds, setTeamIds] = useState<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(TEAM_KEY);
    if (stored) {
      setTeamIds(JSON.parse(stored));
    }
  }, []);

  const selectedTeam = dataPokemon.filter((pokemon) =>
    teamIds.includes(pokemon.id)
  );

  return (
    <div>
      <h1>Équipe Choisie</h1>

      {selectedTeam.length === 0 ? (
        <p>Aucun Pokémon dans l’équipe</p>
      ) : (
        <div className="pokemon-container">
          {selectedTeam.map((p) => (
            <PokemonCard key={p.id} creature={p} />
          ))}
        </div>
      )}

      <DefensiveCoverageButton />
    </div>
  );
}
