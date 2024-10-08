import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import PokemonCard, { poketype } from "../../component/PokemonCard";
import axios from "axios";
import "./TeamRandom.css";

type resistType = {
  name: string;
  message: string;
};

export default function TeamRandom() {
  const TeamRandom = useLoaderData() as poketype[];
  const [resist, setResist] = useState() as resistType[];

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

  return (
    <>
      <h1>Équipe aléatoire</h1>
      <p style={{ textAlign: "center" }}>
        Génère une liste de 3 Pokémon aléatoires, puis la complète avec 3 autres
        Pokémon pour obtenir une équipe aux résistances équilibrées
      </p>

      <div className="pokemon-container">
        {TeamRandom[0].map((p: poketype) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>
      <section className="section-resist">
        <button onClick={setOnClick}>Voir les résistances</button>
        <p>
          <strong>{resist && resist[0].summary}</strong>
        </p>
        <table>
          <tr>
            <th>Type</th>
            <th>Resistance</th>
          </tr>
          {resist?.map((r: resistType) => (
            <tr>
              <td>{r.name}</td>
              <td>{r.message}</td>
            </tr>
          ))}
        </table>
      </section>
    </>
  );
}

// todo trouver les bon type pour les props pour les map
