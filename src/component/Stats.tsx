type StatsT = {
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
};
type StatT = {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
};

export default function Stats({ stats }: StatsT) {
  return (
    <table>
      <thead>
        <tr>
          <th>Stat</th>
          <th>Valeur</th>
        </tr>
      </thead>
      <tbody>
        {" "}
        {Object.keys(stats).map((key) => (
          <tr key={key}>
            <td>{key}</td>
            {stats[key as keyof StatT] >= 100 ? (
              <td>
                <strong style={{ color: "red" }}>
                  {stats[key as keyof StatT]}
                </strong>
              </td>
            ) : stats[key as keyof StatT] > 50 ? (
              <td>
                {" "}
                <strong style={{ color: "orange" }}>
                  {stats[key as keyof StatT]}
                </strong>
              </td>
            ) : (
              <td>{stats[key as keyof StatT]}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
