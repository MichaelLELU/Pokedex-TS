import "./ToogleBtn.css";

interface ToogleBtnProps {
  toogle: boolean;
  setToogle: (toogle: boolean) => void;
}

export default function ToogleBtn({ toogle, setToogle }: ToogleBtnProps) {
  const toogleSearch = () => {
    setToogle(!toogle);
  };

  return (
    <label htmlFor="searchBy" className="search-by">
      Rechercher par :{" "}
      <button
        onClick={toogleSearch}
        className={`toogle-btn ${toogle! ? "toogled" : ""}`}
      >
        {toogle === false ? "ID" : "NOM"}
        <div className="thumb"></div>
      </button>
    </label>
  );
}
