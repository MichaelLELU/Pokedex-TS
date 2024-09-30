export default function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/pokemons">Pokemons</a>
        </li>
        <li>
          <a href="/types">
            <select name="" id="">
              {" "}
              <option value=""></option>
            </select>
          </a>
        </li>
      </ul>
    </nav>
  );
}
