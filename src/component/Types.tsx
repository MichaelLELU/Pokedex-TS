import { useEffect, useState } from "react";
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
    <>
      <h2>
        Choisissez un type de Pokémon{" "}
        <button onClick={toggleOnClick}>{show === false ? "+" : "-"}</button>
      </h2>{" "}
      {show === true ? (
        <div className="type-container">
          {dataType?.map((t) => (
            <a href={`/type/${t.name}`}>
              <div className="type-card">
                <h2>{t.name}</h2>
                <img src={t.image} alt={t.name} />
              </div>
            </a>
          ))}
        </div>
      ) : null}
    </>
  );
}

//todo coriger le MAP !! qui nexixte pas sur un type never  xD
