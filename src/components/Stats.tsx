import type { Stats as StatsType } from "../types/stats";

type StatsProps = {
  stats: StatsType;
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
            {stats[key as keyof StatsType] >= 95 ? (
              <td>
                <strong style={{ color: "green" }}>
                  {stats[key as keyof StatsType]}
                </strong>
              </td>
            ) : stats[key as keyof StatsType] >= 65 ? (
              <td>
                <strong style={{ color: "orange" }}>
                  {stats[key as keyof StatsType]}
                </strong>
              </td>
            ) : (
              <td style={{ color: "red" }}>{stats[key as keyof StatsType]}</td>
            )}
          </tr>
        ))}

      </tbody>
    </table>
  );
}
