import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import PokemonCard from "../../component/PokemonCard";
import axios from "axios";
import "./TeamRandom.css";

type poketype = {
  pokemon: {
    id: number;
    name: string;
    pokedexId: number;
    image: string;
    apiTypes: { name: string; image: string }[];
  };
};

export default function TeamRandom() {
  const TeamRandom = useLoaderData() as poketype[];
  const [resist, setResist] = useState();

  const setOnClick = async () => {
    await axios
      .post(
        "https://pokebuildapi.fr/api/v1/team/defensive-coverage",
        TeamRandom[0].map((p) => p.pokedexId)
      )
      .then((response) => {
        setResist(response.data);
      });
  };
  console.log(resist);

  return (
    <div>
      <h1>Team Random</h1>
      <p>
        génère une liste de 3 Pokémon aléatoires puis la complète avec 3 autres
        Pokémon pour obtenir une équipe aux résistances équilibrées
      </p>

      <div className="pokemon-container">
        {TeamRandom[0].map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>
      <section className="section-resist">
        <button onClick={setOnClick}>voir les resistences</button>
        <p>
          <strong>{resist && resist[0].summary}</strong>
        </p>
        <table>
          <tr>
            <th>Type</th>
            <th>Resistance</th>
          </tr>
          {resist?.map((r) => (
            <tr>
              <td>{r.name}</td>
              <td>{r.message}</td>
            </tr>
          ))}
        </table>
      </section>
    </div>
  );
}
