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
          {/*           <a href="/types">
            <select name="" id="">
              {" "}
              <option value=""></option>
            </select>
          </a> */}
        </li>
      </ul>
    </nav>
  );
}
