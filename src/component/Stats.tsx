export type StatT = {
  HP: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
};

type StatsProps = {
  stats: StatT;
};

export default function Stats({ stats }: StatsProps) {
  function replaceStatName(key: string) {
    switch (key) {
      case "HP":
        return "Points de vie";
      case "attack":
        return "Attaque";
      case "defense":
        return "Défense";
      case "special_attack":
        return "Attaque Spéciale";
      case "special_defense":
        return "Défense Spéciale";
      case "speed":
        return "Vitesse";
      default:
        return key;
    }
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Stats de base</th>
          <th>Valeur</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(stats).map((key) => (
          <tr key={key}>
            <td>{replaceStatName(key)}</td>
            {stats[key as keyof StatT] >= 95 ? (
              <td>
                <strong style={{ color: "green" }}>
                  {stats[key as keyof StatT]}
                </strong>
              </td>
            ) : stats[key as keyof StatT] >= 65 ? (
              <td>
                <strong style={{ color: "orange" }}>
                  {stats[key as keyof StatT]}
                </strong>
              </td>
            ) : (
              <td style={{ color: "red" }}>{stats[key as keyof StatT]}</td>
            )}
          </tr>
        ))}
        <tr className="total">
          <td>Total</td>
          <td>
            {stats.HP +
              stats.attack +
              stats.defense +
              stats.special_attack +
              stats.special_defense +
              stats.speed}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
