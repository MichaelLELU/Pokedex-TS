import { useLoaderData, Link } from "react-router-dom";
import "./DetailsPage.css";
import Stats, { StatT } from "../../component/Stats";

interface Pokemon {
  name: string;
  pokedexId: number;
  sprite: string;
  image: string;
  apiTypes: { name: string; image: string }[];
  apiEvolutions: { name: string; id: number }[];
  apiPreEvolution: { name: string };
  stats: StatT; // Assurez-vous que c'est un tableau d'objets Stat
}

export default function DetailsPage() {
  const pokemon = useLoaderData() as Pokemon;

  return (
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
      <p>ID: {pokemon.pokedexId}</p>
      <img src={pokemon.image} alt={pokemon.name} loading="lazy" />
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

      <article className="evolutions-container">
        <div>
          {pokemon.apiPreEvolution.name ? <h2>Pré-évolution :</h2> : null}
          <Link to={`/pokemon/${pokemon.apiPreEvolution.name}`}>
            <h3>{pokemon.apiPreEvolution.name}</h3>
          </Link>
        </div>
        <div>
          {pokemon.apiEvolutions.length === 0 ? null : (
            <h2>Évolution{pokemon.apiEvolutions.length > 1 ? "s" : ""} :</h2>
          )}
          {pokemon.apiEvolutions.map((evo: { name: string; id: number }) => (
            <Link key={evo.id} to={`/pokemon/${evo.name}`}>
              <h3>{evo.name}</h3>
            </Link>
          ))}
        </div>
      </article>
      <Stats stats={pokemon.stats} />
    </div>
  );
}
