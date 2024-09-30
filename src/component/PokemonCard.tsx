type poketype = {
  pokemon: {
    name: string;
    pokedexId: number;
    image: string;
    apiTypes: { name: string; image: string }[];
  };
};

export default function PokemonCard(pokemon: poketype) {
  const Pokemon = pokemon.pokemon;

  return (
    <a href={`/pokemon/${Pokemon.name}`}>
      <div className="pokemon-card-container">
        <h1>{Pokemon.name}</h1>
        <p>ID: {Pokemon.pokedexId}</p>
        <img src={Pokemon.image} alt={Pokemon.name} />
        <div id="type-button">
          {Pokemon.apiTypes.map(
            (type: { name: string; image: string }, id: number) => (
              <a key={id} href={`/type/${type.name}`} className="button-type">
                <img className="type" src={type.image} />
                <p>{type.name}</p>
              </a>
            )
          )}
        </div>
      </div>
    </a>
  );
}
