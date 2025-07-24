import { createContext, useContext, useEffect, useState } from "react";

const TEAM_KEY = "pokemonTeamIds";

type TeamContextType = {
  team: number[];
  addToTeam: (id: number) => void;
  removeFromTeam: (id: number) => void;
    clearTeam: () => void;
};

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export function TeamProvider({ children }: { children: React.ReactNode }) {
  const [team, setTeam] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(TEAM_KEY);
    if (saved) setTeam(JSON.parse(saved));
  }, []);

  const updateStorage = (updated: number[]) => {
    setTeam(updated);
    localStorage.setItem(TEAM_KEY, JSON.stringify(updated));
  };

  const addToTeam = (id: number) => {
    if (!team.includes(id) && team.length < 6) {
      updateStorage([...team, id]);
    }
  };

  const removeFromTeam = (id: number) => {
    updateStorage(team.filter((t) => t !== id));
  };

  const clearTeam = () => {
  setTeam([]);
  localStorage.removeItem(TEAM_KEY);
};

  return (
    <TeamContext.Provider value={{ team, addToTeam, removeFromTeam, clearTeam }}>
      {children}
    </TeamContext.Provider>
  );
}

export const useTeam = (): TeamContextType => {
  const context = useContext(TeamContext);
  if (!context) throw new Error("useTeam must be used within a TeamProvider");
  return context;
};
