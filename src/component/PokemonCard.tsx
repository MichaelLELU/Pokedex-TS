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

const PkmnTypes: string[] = [
  "#9FA19F",
  "#3FA129",
  "#E62829",
  "#2980EF",
  "#9141CB",
  "#81B9EF",
  "#91A119",
  "#624D4E",
  "#FAC000",
  "#EF4179",
  "#3DCEF3",
  "#B7A9F7",
  "#60A1B8",
  "#EF70EF",
  "#915121",
  "#FF8000",
  "#AFA981",
  "#704170",
];

export default function PokemonCard(pokemon: poketype) {
  const Pokemon = pokemon.pokemon;

  const cardContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const getTypeColor = (type: string) => {
      switch (type) {
        case "Normal": {
          return PkmnTypes[0];
        }
        case "Plante": {
          return PkmnTypes[1];
        }
        case "Feu": {
          return PkmnTypes[2];
        }
        case "Eau": {
          return PkmnTypes[3];
        }
        case "Poison": {
          return PkmnTypes[4];
        }
        case "Vol": {
          return PkmnTypes[5];
        }
        case "Insecte": {
          return PkmnTypes[6];
        }
        case "Ténèbres": {
          return PkmnTypes[7];
        }
        case "Électrik": {
          return PkmnTypes[8];
        }
        case "Psy": {
          return PkmnTypes[9];
        }
        case "Glace": {
          return PkmnTypes[10];
        }
        case "Dragon": {
          return PkmnTypes[11];
        }
        case "Acier": {
          return PkmnTypes[12];
        }
        case "Fée": {
          return PkmnTypes[13];
        }
        case "Sol": {
          return PkmnTypes[14];
        }
        case "Combat": {
          return PkmnTypes[15];
        }
        case "Roche": {
          return PkmnTypes[16];
        }
        case "Spectre": {
          return PkmnTypes[17];
        }
        default: {
          return PkmnTypes[0];
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
