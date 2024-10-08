import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./PokemonCard.css";

interface PokemonCardProps {
  creature: poketype; // Typage du prop pokemon
}

export type poketype = {
  id: number;
  name: string;
  pokedexId: number;
  image: string;
  apiTypes: { name: string; image: string }[];
};

export default function PokemonCard({ creature }: PokemonCardProps) {
  const Pokemon = creature;

  const cardContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const pkmnTypes: { [key: string]: string } = {
      Normal: "#9FA19F",
      Plante: "#3FA129",
      Feu: "#E62829",
      Eau: "#2980EF",
      Poison: "#9141CB",
      Vol: "#81B9EF",
      Insecte: "#91A119",
      Ténèbres: "#624D4E",
      Électrik: "#FAC000",
      Psy: "#EF4179",
      Glace: "#3DCEF3",
      Dragon: "#B7A9F7",
      Acier: "#60A1B8",
      Fée: "#EF70EF",
      Sol: "#915121",
      Combat: "#FF8000",
      Roche: "#AFA981",
      Spectre: "#704170",
    };

    const getTypeColor = (type: string) => {
      return pkmnTypes[type];
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
      <Link to={`/pokemon/${Pokemon.id}`}>
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
