import Types from "./Types";

//todo trouver les bon type pour les props

export default function NavBar({ mode, setMode }) {
  const toggleOnClick = () => {
    setMode(!mode);
  };

  return (
    <nav>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <button onClick={toggleOnClick}>
            {mode ? "Dark Mode" : "Light Mode"}
          </button>
        </li>
        <li>
          <Types />
        </li>
      </ul>
    </nav>
  );
}
