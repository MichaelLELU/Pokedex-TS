import { Link } from "react-router-dom";
import "./PokemonCard.css";

export type poketype = {
  id: number;
  pokemon: {
    id: number;
    name: string;
    pokedexId: number;
    image: string;
    apiTypes: { name: string; image: string }[];
  };
};

export default function PokemonCard(pokemon: poketype) {
  const Pokemon = pokemon.pokemon;

  return (
    <div className="pokemon-card-container">
      <Link to={`/pokemon/${Pokemon.name}`}>
        <h1>{Pokemon.name}</h1>
        <p>ID: {Pokemon.pokedexId}</p>
        <img src={Pokemon.image} alt={Pokemon.name} />
      </Link>
      <div id="type-button">
        {Pokemon.apiTypes.map(
          (type: { name: string; image: string }, id: number) => (
            <Link key={id} to={`/type/${type.name}`} className="button-type">
              <img className="type" src={type.image} />
              <p>{type.name}</p>
            </Link>
          )
        )}
      </div>
    </div>
  );
}
