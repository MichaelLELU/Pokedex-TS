import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { TYPE_COLORS } from "../../constants/pokemonTypes";
import pokeball from "../../assets/pokeball.svg";
import "./PokemonCard.css";
import type { Pokemon } from "../../types/pokemon";

interface PokemonCardProps {
  creature: Pokemon;
}

export default function PokemonCard({ creature }: PokemonCardProps) {
  const pokemon = creature;

  const cardContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pokemon.apiTypes && pokemon.apiTypes.length > 0) {
      const color1 =
        TYPE_COLORS[pokemon.apiTypes[0].name] ?? "#ffffff";

      if (pokemon.apiTypes[1]) {
        const color2 =
          TYPE_COLORS[pokemon.apiTypes[1].name] ?? "#ffffff";

        cardContainer.current?.style.setProperty(
          "background",
          `linear-gradient(180deg, ${color1}, ${color2})`
        );
      } else {
        cardContainer.current?.style.setProperty(
          "background",
          color1
        );
      }

      cardContainer.current?.style.setProperty(
        "--_color",
        "#fefefe"
      );
    }
  }, [pokemon.apiTypes]);

  return (
    <div className="pokemon-card-container" ref={cardContainer}>
      <Link to={`/pokemon/${pokemon.id}`}>
        <h2>{pokemon.name}</h2>

        <p>ID: {pokemon.pokedexId}</p>

        <LazyLoadImage
          src={pokemon.image}
          alt={pokemon.name}
          width={200}
          height={200}
          placeholderSrc={pokeball}
        />
      </Link>

      <div id="type-button">
        {pokemon.apiTypes.map((type, id) => (
          <Link
            key={id}
            to={`/type/${type.name}`}
            className="button-type"
          >
            <img
              className="type"
              src={type.image}
              loading="lazy"
            />
            <p>{type.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}