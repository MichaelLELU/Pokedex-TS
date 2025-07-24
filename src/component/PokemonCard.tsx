import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import pokeball from "../assets/pokeball.svg";
import "./PokemonCard.css";
import AddToTeamButton from "./addToTeamButton/AddToTeam";

interface PokemonCardProps {
  creature: poketype; // Typage du prop pokemon
}

export type poketype = {
  id: number;
  name: string;
  pokedexId: number;
  image: string;
  apiTypes: { name: string; image: string }[];
  apiGeneration: number;
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
      return pkmnTypes[type] || "#ffffff";
    };

    if (Pokemon.apiTypes && Pokemon.apiTypes.length > 0) {
      const type1: string = Pokemon.apiTypes[0].name;
      const color1 = getTypeColor(type1);

      if (Pokemon.apiTypes[1]) {
        const type2: string = Pokemon.apiTypes[1].name;
        const color2 = getTypeColor(type2);

        cardContainer.current?.style.setProperty(
          "background",
          `linear-gradient(180deg, ${color1}, ${color2})`
        );
      } else {
        cardContainer.current?.style.setProperty("background", color1);
      }

      cardContainer.current?.style.setProperty("--_color", "#fefefe");
    }
  }, [Pokemon.apiTypes]);

  return (
    <div className="pokemon-card-container" ref={cardContainer}>
      <Link to={`/pokemon/${Pokemon.id}`}>
        <h2>{Pokemon.name}</h2>
        <p>ID: {Pokemon.pokedexId}</p>
        <LazyLoadImage
          src={Pokemon.image}
          alt={Pokemon.name}
          width={200}
          height={200}
          placeholderSrc={pokeball}
        />
      </Link>
      <AddToTeamButton pokemonId={Pokemon.id} />
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
