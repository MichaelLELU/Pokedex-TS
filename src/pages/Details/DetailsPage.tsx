import { useLoaderData, Link } from "react-router-dom";
import { useState } from "react";
import "./DetailsPage.css";
import Stats from "../../components/Stats";
import ToggleBtn from "../../components/ToggleBtn/ToggleBtn";
import { ArrowBigRightDash, ArrowBigLeftDash } from "lucide-react";
import type { PokemonDetails } from "../../types/pokemonDetails";


  export default function DetailsPage() {
  const pokemon = useLoaderData() as PokemonDetails;
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
            leftLabel="  Normal"
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
        <div className="pokemon-infos">
          <p>
            <strong>Taille :</strong> {pokemon.height}
          </p>

          <p>
            <strong>Poids :</strong> {pokemon.weight}
          </p>
        </div>
        <h2>Méga-Évolutions</h2>
              {pokemon.megaEvolutions.length > 0 && (
        <div className="mega-container">
          {pokemon.megaEvolutions.map((mega) => (
            <div key={mega.orbe} className="mega-card">
              <h4>{mega.orbe}</h4>

              <img
                src={
                  isShiny
                    ? mega.shinyImage
                    : mega.image
                }
                alt={mega.orbe}
                className="mega-image"
              />
            </div>
          ))}
        </div>
      )}
            {pokemon.gmax && (
        <div className="gmax-container">
          <h2>Gigamax</h2>

          <img
            src={
              isShiny
                ? pokemon.gmax.shinyImage
                : pokemon.gmax.image
            }
            alt={`${pokemon.name} Gigamax`}
            className="gmax-image"
          />
        </div>
      )}
        <section className="evolutions-container">
          {pokemon.apiEvolutions.length > 0 && (
            <div>
              <h2>Évolution{pokemon.apiEvolutions.length > 1 ? "s" : ""}</h2>
              {pokemon.apiEvolutions.map((evo) => (
                <Link key={evo.pokedexId} to={`/pokemon/${evo.pokedexId}`}>
                  <span>{evo.name} {evo.condition}</span>
                </Link>
              ))}
            </div>
          )}
          {pokemon.apiPreEvolution.length > 0 && (
            <div>
              <h2>Pré-évolution{pokemon.apiPreEvolution.length > 1 ? "s" : ""}</h2>
              {pokemon.apiPreEvolution.map((evo) => (
                <Link key={evo.pokedexId} to={`/pokemon/${evo.pokedexId}`}>
                  <span>{evo.name} {evo.condition}</span>
                </Link>
              ))}
            </div>
          )}
        </section>
        <Stats stats={pokemon.stats} />
      </div>
    </>
  );
}
