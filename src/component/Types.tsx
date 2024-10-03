import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Types() {
  const [dataType, setDataType] = useState();
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
    <nav>
      <h2>
        Choisissez un type de Pokémon{" "}
        <button onClick={toggleOnClick}>{show === false ? "+" : "-"}</button>
      </h2>{" "}
      {show === true ? (
        <ul className="type-container">
          {dataType?.map((t) => (
            <Link to={`/type/${t.name}`}>
              <li className="type-card">
                <h2>{t.name}</h2>
                <img src={t.image} alt={t.name} loading="lazy" />
              </li>
            </Link>
          ))}
        </ul>
      ) : null}
    </nav>
  );
}

//todo coriger le MAP !! qui nexixte pas sur un type never  xD
