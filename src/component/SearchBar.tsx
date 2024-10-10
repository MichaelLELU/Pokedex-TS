import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ToggleBtn from "./ToggleBtn";

type poketype = {
  id: number;
  name: string;
  sprite: string;
};

export default function SearchBar() {
  const [toggle, setToggle] = useState(false) as [
    boolean,
    (toggle: boolean) => void
  ];
  const [searchItem, setSearchItem] = useState("");
  const [findbyId, setFindById] = useState<number | "">("");
  const [data, setData] = useState<poketype[]>([]);
  const [filteredP, setFilteredP] = useState<poketype[]>([]);
  const [filteredById, setFilteredById] = useState<poketype[]>([]);

  const fetchPokemons = async () => {
    try {
      const res = await axios.get("https://pokebuildapi.fr/api/v1/pokemon");
      const data = res.data;
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const handleInputChangeN = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numberTerm = e.target.value ? parseInt(e.target.value) : "";
    setFindById(numberTerm);

    if (numberTerm) {
      const filteredItemsById = data.filter((p) => p.id === numberTerm);
      setFilteredById(filteredItemsById);
    } else {
      setFilteredById([]);
    }
  };

  const handleInputChangeS = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredItems = data.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredP(filteredItems);
  };

  return (
    <>
      <div className="search-by">
        <ToggleBtn toggle={toggle} setToggle={setToggle} />
      </div>
      <div className="search-container">
        {toggle === false ? (
          <div className="search-comp">
            <label htmlFor="name">
              <p>Rechercher par Nom</p>
              <input
                type="text"
                value={searchItem}
                onChange={handleInputChangeS}
                placeholder="Rechercher un Pokemon..."
                id="search-input"
              />
            </label>
            {searchItem.length <= 2 ? (
              <p>
                <i>3 caractères min.</i>
              </p>
            ) : (
              <ul className="search-list">
                {filteredP.length === 0 ? <p>Aucun résultat</p> : null}
                {filteredP.map((p: poketype) => (
                  <Link to={`/pokemon/${p.id}`} key={p.id}>
                    <li className="search-result">
                      {p.name}
                      <p>{p.id}</p>
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
        ) : (
          <div className="search-comp">
            <label htmlFor="id">
              <p>Rechercher par ID</p>
              <input
                type="number"
                value={findbyId}
                onChange={handleInputChangeN}
                placeholder="id du Pokemon..."
                id="search-input"
              />
            </label>

            {filteredById.length === 0 ? (
              <p>
                <i>nombre seulement</i>
              </p>
            ) : filteredById.length === 0 ? null : (
              <ul className="search-list">
                {filteredById.length === 0 && findbyId !== "" ? (
                  <p>Aucun résultat</p>
                ) : (
                  filteredById.map((p: poketype) => (
                    <Link to={`/pokemon/${p.id}`} key={p.id}>
                      <li className="search-result">
                        {p.name}
                        <img
                          className="sprite-search"
                          src={p.sprite}
                          alt={`sprite of ${p.name}`}
                          loading="lazy"
                        />
                      </li>
                    </Link>
                  ))
                )}
              </ul>
            )}
          </div>
        )}
      </div>
    </>
  );
}
