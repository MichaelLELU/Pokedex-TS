import { useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import pokeball from "../assets/pokeball.svg";
import ToggleBtn from "./ToggleBtn/ToggleBtn";

type poketype = {
  id: number;
  name: string;
  sprite: string;
};

interface SearchBarProps {
  pokemons: poketype[];
}

export default function SearchBar({ pokemons }: SearchBarProps) {
  const [toggle, setToggle] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [findbyId, setFindById] = useState<number | "">("");
  const [filteredP, setFilteredP] = useState<poketype[]>([]);
  const [filteredById, setFilteredById] = useState<poketype[]>([]);

  const handleInputChangeN = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numberTerm = e.target.value ? parseInt(e.target.value) : "";
    setFindById(numberTerm);

    if (numberTerm) {
      const filteredItemsById = pokemons.filter(
        (p) => p.id === numberTerm
      );

      setFilteredById(filteredItemsById);
    } else {
      setFilteredById([]);
    }
  };

  const handleInputChangeS = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredItems = pokemons.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredP(filteredItems);
  };

  return (
    <>
      <div className="search-by">
        <ToggleBtn
          toggle={toggle}
          setToggle={setToggle}
          leftLabel="NOM"
          rightLabel="ID"
        />
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
                {filteredP.length === 0 ? (
                  <p>Aucun résultat</p>
                ) : null}

                {filteredP.map((p) => (
                  <Link to={`/pokemon/${p.id}`} key={p.id}>
                    <li className="search-result">
                      {p.name}

                      <p>{p.id}</p>

                      <LazyLoadImage
                        className="sprite-search"
                        src={p.sprite}
                        alt={`sprite of ${p.name}`}
                        placeholderSrc={pokeball}
                        placeholder={
                          <img
                            src={pokeball}
                            className="loading-pokeball"
                            alt="loading"
                          />
                        }
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

            {findbyId === "" ? (
              <p>
                <i>nombre seulement</i>
              </p>
            ) : (
              <ul className="search-list">
                {filteredById.length === 0 ? (
                  <p>Aucun résultat</p>
                ) : (
                  filteredById.map((p) => (
                    <Link to={`/pokemon/${p.id}`} key={p.id}>
                      <li className="search-result">
                        {p.name}

                        <LazyLoadImage
                          className="sprite-search"
                          src={p.sprite}
                          alt={`sprite of ${p.name}`}
                          placeholderSrc={pokeball}
                          placeholder={
                            <img
                              src={pokeball}
                              className="loading-pokeball"
                              alt="loading"
                            />
                          }
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