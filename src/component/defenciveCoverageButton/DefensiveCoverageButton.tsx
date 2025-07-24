import { useEffect, useState } from "react";
import axios from "axios";
import { ShieldCheck, AlertTriangle, Minus, Shield, ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTeam } from "../../context/TeamContext";
import "./CoverageTable.css";

const TEAM_KEY = "pokemonTeamIds";

// Types
interface TypeInfo {
  name: string;
  image: string;
}

interface TypeResult {
  name: string;
  result: "resistant" | "vulnerable" | "balanced" | "slightly-resistant" | "slightly-vulnerable";
  message: string;
  values: number[];
}

interface PokemonInfo {
  id: number;
  sprite: string;
  results: TypeResult[];
}

export default function DefensiveCoverageButton() {
  const [team, setTeam] = useState<PokemonInfo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [typeInfoList, setTypeInfoList] = useState<TypeInfo[]>([]);

  const navigate = useNavigate();
    const { clearTeam } = useTeam();

      const handleReset = () => {
    clearTeam();
    navigate("/");
  };

  useEffect(() => {
    axios.get("https://pokebuildapi.fr/api/v1/types").then((res) => {
      setTypeInfoList(res.data);
    });
  }, []);

  const getTypeImage = (typeName: string): string => {
    const match = typeInfoList.find((t) => t.name.toLowerCase() === typeName.toLowerCase());
    return match?.image || "";
  };

  const getResultColor = (result: string): string => {
    switch (result) {
      case "resistant":
        return "#2ecc71";
      case "slightly-resistant":
        return "#a3f7bf";
      case "balanced":
        return "#ecf0f1";
      case "slightly-vulnerable":
        return "#f5cba7";
      case "vulnerable":
        return "#e74c3c";
      default:
        return "#ddd";
    }
  };

  const getResultScore = (result: string): number => {
    switch (result) {
      case "resistant":
        return 1;
      case "slightly-resistant":
        return 0.5;
      case "balanced":
        return 0;
      case "slightly-vulnerable":
        return -0.5;
      case "vulnerable":
        return -1;
      default:
        return 0;
    }
  };

const getResultIcon = (avg: number) => {
  if (avg >= 0.75)
    return (
      <div title="Très résistant" className="type-moyenne">
        <ShieldCheck color="#27ae60" />
        <strong>1</strong>
      </div>
    );
  if (avg >= 0.25)
    return (
      <div title="Résistant" className="type-moyenne">
        <Shield color="#2ecc71" />
        <strong>0.5</strong>
      </div>
    );
  if (avg > -0.25)
    return (
      <div title="Équilibré" className="type-moyenne">
        <Minus color="#95a5a6" />
        <strong>0</strong>
      </div>
    );
  if (avg > -0.75)
    return (
      <div title="Légèrement vulnérable" className="type-moyenne">
        <ShieldAlert color="#e67e22" />
        <strong>-0.5</strong>
      </div>
    );
  return (
    <div title="Vulnérable" className="type-moyenne">
      <AlertTriangle color="#e74c3c" />
      <strong>-1</strong>
    </div>
  );
};

  const handleClick = async () => {
    setError(null);
    const raw = localStorage.getItem(TEAM_KEY);
    if (!raw) {
      setError("Aucun Pokémon sélectionné.");
      return;
    }

    const teamIds: number[] = JSON.parse(raw);
    if (teamIds.length === 0) {
      setError("L’équipe est vide.");
      return;
    }

    try {
      const responses = await Promise.all(
        teamIds.map(async (id) => {
          const [pokemonRes, resultRes] = await Promise.all([
            axios.get(`https://pokebuildapi.fr/api/v1/pokemon/${id}`),
            fetch("https://pokebuildapi.fr/api/v1/team/defensive-coverage", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify([id]),
            }).then((res) => res.json()),
          ]);

          return {
            id: id,
            sprite: pokemonRes.data.image,
            results: resultRes,
          };
        })
      );

      setTeam(responses);
    } catch (err) {
      setError((err as Error).message);
    }
  };


  const allTypes = team[0]?.results.map((t) => t.name) || [];

  return (
    <div className="coverage-button-container">
      <button onClick={handleClick} className="coverage-button">
        Générer une couverture défensive
      </button>
    <button onClick={handleReset} className="reset-button">
      Réinitialiser l’équipe
    </button>


      {error && <p style={{ color: "red" }}>{error}</p>}

      {team.length > 0 && (
        <div style={{ marginTop: "1rem", overflowX: "auto" }}>
          <table className="coverage-table">
            <thead>
              <tr>
                <th>Type</th>
                {team.map((pokemon) => (
                  <th key={pokemon.id}>
                    <img src={pokemon.sprite} alt={`pokemon-${pokemon.id}`} className="pokemon-sprite" />
                  </th>
                ))}
                <th>Moyenne</th>
              </tr>
            </thead>
            <tbody>
              {allTypes.map((typeName, index) => (
                <tr key={index}>
                  <td className="type-cell">
                    <div className="type-label">
                      <img src={getTypeImage(typeName)} alt={typeName} className="type-icon" />
                      <span>{typeName}</span>
                    </div>
                  </td>
                  {team.map((poke) => {
                    return (
                            <td
                            className="type-result"
                          key={poke.id + typeName}
                          style={{
                            backgroundColor: getResultColor(poke.results.find((r) => r.name === typeName)?.result || ""),
                          }}
                        >
                          {poke.results.find((r) => r.name === typeName)?.result}
                        </td>
                    );
                  })}
                  <td >
                    {(() => {
                      const scores = team.map((poke) => {
                        const result = poke.results.find((r) => r.name === typeName)?.result || "balanced";
                        return getResultScore(result);
                      });
                      const avg = scores.reduce((acc, val) => acc + val, 0) / scores.length;
                      return getResultIcon(avg);
                    })()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
