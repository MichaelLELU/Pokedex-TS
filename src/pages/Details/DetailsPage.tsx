import { useLoaderData, Link } from "react-router-dom";
import { useState } from "react";
import "./DetailsPage.css";
import Stats, { StatT } from "../../components/Stats";
import ToggleBtn from "../../components/ToggleBtn/ToggleBtn";
import { ArrowBigRightDash, ArrowBigLeftDash } from "lucide-react";


interface Pokemon {
  name: string;
  pokedexId: number;
  image: string;
  shinyImage: string;
  apiGeneration: number;
  apiTypes: { name: string; image: string }[];
  apiEvolutions: { name: string; pokedexId: number }[];
  apiPreEvolution: { name: string; pokedexId: number; } | "none";
  stats: StatT;
}

  export default function DetailsPage() {
  const pokemon = useLoaderData() as Pokemon;
  const [isShiny, setIsShiny] = useState(false);

  const displayedImage = isShiny && pokemon.shinyImage
    ? pokemon.shinyImage
    : pokemon.image;


  const handleBack = () => {
    window.history.back();
  };

  return (
    <>
      <button onClick={handleBack} className="return-button">
        Retour
      </button>
      <div className="details-container">
        <h1 className="detail-title">
          {pokemon.name}
        </h1>
        <div className="id-nav">
          {pokemon.pokedexId === 1 ? null : (
            <Link to={`/pokemon/${pokemon.pokedexId - 1}`} className="nav-link">
              <ArrowBigLeftDash size={40} />
            </Link>
          )}
          <p>ID: {pokemon.pokedexId}</p>
          {pokemon.pokedexId === 898 ? null : (
            <Link to={`/pokemon/${pokemon.pokedexId + 1}`} className="nav-link">
              <ArrowBigRightDash size={40} />
            </Link>
          )}
        </div>
          <img
            src={displayedImage}
            alt={isShiny ? `${pokemon.name} shiny` : pokemon.name}
            loading="lazy"
            className="portrait"
          />

          <ToggleBtn
            toggle={isShiny}
            setToggle={setIsShiny}
            leftLabel="Normal"
            rightLabel="Shiny ✨"
          />

        <div className="type-button-container">
          {pokemon.apiTypes.map(
            (type: { name: string; image: string }, id: number) => (
              <Link key={id} to={`/type/${type.name}`} className="button-type">
                <img className="type" src={type.image} loading="lazy" />
                <p>{type.name}</p>
              </Link>
            )
          )}
        </div>
        <p style={{ fontSize: "14pt" }}>
          <span style={{ userSelect: "none" }}>{"Generation: "}</span>
          <Link
            to={`/generation/${pokemon.apiGeneration}`}
          >
            {pokemon.apiGeneration}
          </Link>
        </p>
        <section className="evolutions-container">
          {pokemon.apiEvolutions.length > 0 && (
            <div>
              <h2>Évolution{pokemon.apiEvolutions.length > 1 ? "s" : ""}</h2>
              {pokemon.apiEvolutions.map((evo) => (
                <Link key={evo.pokedexId} to={`/pokemon/${evo.pokedexId}`}>
                  <span>{evo.name}</span>
                </Link>
              ))}
            </div>
          )}
          {typeof pokemon.apiPreEvolution === "string" &&
          pokemon.apiPreEvolution === "none" ? null : (
            <div>
              <h2>Pré-évolution</h2>
              <Link to={`/pokemon/${pokemon.apiPreEvolution.pokedexId}`}>
                <span>{pokemon.apiPreEvolution.name}</span>
              </Link>
            </div>
          )}
        </section>
        <Stats stats={pokemon.stats} />
      </div>
    </>
  );
}
