import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import pokeball from "/public/pokeball.svg";

export default function Types() {
  interface dataType {
    name: string;
    image: string;
  }
  const [dataType, setDataType] = useState<dataType[]>([]);
  const [show, setShow] = useState(false);

  const toggleOnClick = () => {
    setShow(!show);
  };

  useEffect(() => {
    axios.get(`https://pokebuildapi.fr/api/v1/types`).then((response) => {
      setDataType(response.data);
    });
  }, []);

  return (
    <>
      <h2>
        Filtrer par type de Pokémon
        <button onClick={toggleOnClick}>{show === false ? "+" : "-"}</button>
      </h2>
      {show && (
        <ul className="type-container">
          <Link to="/">
            <li className="type-card">
              <h2>Tous</h2>
              <img src={pokeball} alt="Tous les types" loading="lazy" />
            </li>
          </Link>
          {dataType &&
            dataType.map((t) => (
              <Link to={`/type/${t.name}`} key={t.name}>
                <li className="type-card">
                  <h2>{t.name}</h2>
                  <img src={t.image} alt={t.name} loading="lazy" />
                </li>
              </Link>
            ))}
        </ul>
      )}
    </>
  );
}

//todo coriger le MAP !! qui nexixte pas sur un type never  xD
