import { useTeam } from "../../context/TeamContext";
import "./AddToTeam.css";

type AddToTeamButtonProps = {
  pokemonId: number;
};

export default function AddToTeamButton({ pokemonId }: AddToTeamButtonProps) {
  const { team, addToTeam, removeFromTeam } = useTeam();
  const isInTeam = team.includes(pokemonId);

  const handleClick = () => {
    isInTeam ? removeFromTeam(pokemonId) : addToTeam(pokemonId);
  };

  const isLimitReached = !isInTeam && team.length >= 6;

  return (
    <button
      onClick={handleClick}
      disabled={isLimitReached}
      className={`add-to-team-button ${isInTeam ? "remove" : "add"}`}
    >
      {isInTeam ? "Retirer de l’équipe" : "Ajouter à l’équipe"}
    </button>
  );
}
