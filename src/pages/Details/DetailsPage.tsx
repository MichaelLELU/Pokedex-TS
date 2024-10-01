import { useLoaderData } from "react-router-dom";
import "./DetailsPage.css";

export default function DetailsPage() {
  const pokemon = useLoaderData() as {
    name: string;
    pokedexId: number;
    sprite: string;
    image: string;
    apiTypes: { name: string; image: string }[];
    apiEvolutions: { name: string; id: number }[];
    apiPreEvolution: { name: string };
  };

  return (
    <div className="details-container">
      <h1 className="detail-title">
        {pokemon.name}{" "}
        <img
          className="sprite"
          src={pokemon.sprite}
          alt={`sprite of ${pokemon.name}`}
        />
      </h1>
      <p>ID: {pokemon.pokedexId}</p>
      <img src={pokemon.image} alt={pokemon.name} />
      <div className="type-button">
        {pokemon.apiTypes.map(
          (type: { name: string; image: string }, id: number) => (
            <a key={id} href={`/type/${type.name}`} className="button-type">
              <img className="type" src={type.image} />
              <p>{type.name}</p>
            </a>
          )
        )}
      </div>
      <article>
        <h2>Evolution(s) :</h2>
        {pokemon.apiEvolutions.map((evo: { name: string; id: number }) => (
          <a key={evo.id} href={`./${evo.name}`}>
            <h3>{evo.name}</h3>
          </a>
        ))}
        {pokemon.apiPreEvolution.name ? <h2>Pre-evolution :</h2> : null}
        <a href={`./${pokemon.apiPreEvolution.name}`}>
          <h3>{pokemon.apiPreEvolution.name}</h3>
        </a>
      </article>
    </div>
  );
}
