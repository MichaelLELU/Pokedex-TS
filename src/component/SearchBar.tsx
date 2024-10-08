import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

type poketype = {
  id: number;
  name: string;
  sprite: string;
};

export default function SearchBar() {
  const [searchItem, setSearchItem] = useState("");
  const [data, setData] = useState<poketype[]>([]);
  const [filteredP, setFilteredP] = useState<poketype[]>([]);

  const fetchPokemons = async () => {
    try {
      const res = await axios.get("https://pokebuildapi.fr/api/v1/pokemon");
      const data = res.data;
      return setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, [searchItem]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredItems = data.filter((p: { name: string }) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredP(filteredItems);
  };

  return (
    <div className="search-comp">
      <input
        type="text"
        value={searchItem}
        onChange={handleInputChange}
        placeholder="Rechercher un Pokemon..."
      />
      {searchItem.length <= 2 ? (
        <p>
          <i>3 caractères min.</i>
        </p>
      ) : (
        <ul className="search-list">
          {filteredP.length === 0 ? <p>Aucun résultat</p> : null}
          {filteredP?.map((p: poketype) => (
            <Link to={`/pokemon/${p.name}`}>
              <li key={p.id} className="search-result">
                {p.name}
                <img
                  className="sprite-search"
                  src={p.sprite}
                  alt={`sprite of ${p.name}`}
                  loading="lazy"
                />
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}
