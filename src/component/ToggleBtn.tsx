import "./ToggleBtn.css";

interface ToggleBtnProps {
  toggle: boolean;
  setToggle: (toggle: boolean) => void;
}

export default function ToggleBtn({ toggle, setToggle }: ToggleBtnProps) {
  const toggleSearch = () => {
    setToggle(!toggle);
  };

  return (
    <label htmlFor="searchBy" className="search-by">
      Rechercher par
      <button
        onClick={toggleSearch}
        className={`toggle-btn ${toggle! ? "toggled" : ""}`}
      >
        {toggle === false ? "NOM" : "ID"}
        <div className="thumb"></div>
      </button>
    </label>
  );
}
