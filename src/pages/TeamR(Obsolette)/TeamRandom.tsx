import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import PokemonCard, { poketype } from "../../component/PokemonCard";
import axios from "axios";
import "./TeamRandom.css";

type resistType = {
  name: string;
  message: string;
  summary: string;
}[];

export default function TeamRandom() {
  const TeamRandom = useLoaderData() as poketype[][];
  const [resist, setResist] = useState<resistType>();

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
      <h1 style={{ userSelect: "none" }}>Équipe aléatoire</h1>
      <p style={{ textAlign: "center", userSelect: "none" }}>
        Génère une liste de 3 Pokémon aléatoires, puis la complète avec 3 autres
        Pokémon pour obtenir une équipe aux résistances équilibrées.
      </p>

      <div className="pokemon-container">
        {TeamRandom[0].map((p) => (
          <PokemonCard key={p.id} creature={p} />
        ))}
      </div>
      <section className="section-resist">
        <details onClick={setOnClick}>
          <summary>Voir les résistances</summary>
          <div>
            <p>
              <strong>{resist && resist[0].summary}</strong>
            </p>
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Resistance</th>
                </tr>
              </thead>
              <tbody>
                {resist?.map((r) => (
                  <tr id={r.name}>
                    <td>{r.name}</td>
                    <td>{r.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </section>
    </>
  );
}
