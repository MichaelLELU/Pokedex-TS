import { useRef, useEffect } from "react";
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

  const cardContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const getTypeColor = (type: string) => {
      switch (type) {
        case "Normal": {
          return "#9FA19F";
        }
        case "Plante": {
          return "#3FA129";
        }
        case "Feu": {
          return "#E62829";
        }
        case "Eau": {
          return "#2980EF";
        }
        case "Poison": {
          return "#9141CB";
        }
        case "Vol": {
          return "#81B9EF";
        }
        case "Insecte": {
          return "#91A119";
        }
        case "Ténèbres": {
          return "#624D4E";
        }
        case "Électrik": {
          return "#FAC000";
        }
        case "Psy": {
          return "#EF4179";
        }
        case "Glace": {
          return "#3DCEF3";
        }
        case "Dragon": {
          return "#B7A9F7";
        }
        case "Acier": {
          return "#60A1B8";
        }
        case "Fée": {
          return "#EF70EF";
        }
        case "Sol": {
          return "#915121";
        }
        case "Combat": {
          return "#FF8000";
        }
        case "Roche": {
          return "#AFA981";
        }
        case "Spectre": {
          return "#704170";
        }
        default: {
          return "#9FA19F";
        }
      }
    };

    if (Pokemon.apiTypes && Pokemon.apiTypes[0]) {
      const currentType: string = Pokemon.apiTypes[0].name;
      cardContainer.current?.style.setProperty(
        "--_background",
        getTypeColor(currentType)
      );
      cardContainer.current?.style.setProperty("--_color", "#fefefe");
    }
  }, [Pokemon.apiTypes]);

  return (
    <div className="pokemon-card-container" ref={cardContainer}>
      <Link to={`/pokemon/${Pokemon.name}`}>
        <h2>{Pokemon.name}</h2>
        <p>ID: {Pokemon.pokedexId}</p>
        <img src={Pokemon.image} alt={Pokemon.name} loading="lazy" />
      </Link>
      <div id="type-button">
        {Pokemon.apiTypes.map(
          (type: { name: string; image: string }, id: number) => (
            <Link key={id} to={`/type/${type.name}`} className="button-type">
              <img className="type" src={type.image} loading="lazy" />
              <p>{type.name}</p>
            </Link>
          )
        )}
      </div>
    </div>
  );
}
