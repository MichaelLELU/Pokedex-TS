import { useLoaderData, Link } from "react-router-dom";
import "./DetailsPage.css";
import Stats, { StatT } from "../../component/Stats";
import { ArrowBigRightDash, ArrowBigLeftDash } from "lucide-react";

interface Pokemon {
  name: string;
  pokedexId: number;
  sprite: string;
  image: string;
  apiGeneration: number;
  apiTypes: { name: string; image: string }[];
  apiEvolutions: { name: string; pokedexId: number }[];
  apiPreEvolution: { name: string; pokedexIdd: number };
  stats: StatT;
}

export default function DetailsPage() {
  const pokemon = useLoaderData() as Pokemon;

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
          <img
            className="sprite"
            src={pokemon.sprite}
            alt={`sprite of ${pokemon.name}`}
            loading="lazy"
          />
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
          src={pokemon.image}
          alt={pokemon.name}
          loading="lazy"
          className="portrait"
        />

        <div className="type-button">
          {pokemon.apiTypes.map(
            (type: { name: string; image: string }, id: number) => (
              <Link key={id} to={`/type/${type.name}`} className="button-type">
                <img className="type" src={type.image} loading="lazy" />
                <p>{type.name}</p>
              </Link>
            )
          )}
        </div>
        <p>
          Generations:{" "}
          <Link
            to={`/generation/${pokemon.apiGeneration}`}
            className="nav-link"
          >
            {" "}
            {pokemon.apiGeneration}
          </Link>
        </p>
        <article className="evolutions-container">
          <div>
            {pokemon.apiPreEvolution.name ? <h2>Pré-évolution :</h2> : null}
            <Link
              to={`/pokemon/${pokemon.apiPreEvolution.pokedexIdd}`}
              className="nav-link"
            >
              <h3>{pokemon.apiPreEvolution.name}</h3>
            </Link>
          </div>
          <div>
            {pokemon.apiEvolutions.length === 0 ? null : (
              <h2>Évolution{pokemon.apiEvolutions.length > 1 ? "s" : ""} :</h2>
            )}
            {pokemon.apiEvolutions.map((evo) => (
              <Link
                key={evo.pokedexId}
                to={`/pokemon/${evo.pokedexId}`}
                className="nav-link"
              >
                <h3>{evo.name}</h3>
              </Link>
            ))}
          </div>
        </article>
        <Stats stats={pokemon.stats} />
      </div>
    </>
  );
}
