import { createContext } from "react";
import type { ReactNode } from "react";
import { ref, get } from "firebase/database";
import { db } from "../services/firebase";

interface PlayerDataContextType {
  getPlayerStats: (playerKey: string) => Promise<any>;
}

export const PlayerDataContext = createContext<PlayerDataContextType | undefined>(undefined);

export const PlayerDataProvider = ({ children }: { children: ReactNode }) => {

  const getPlayerStats = async (playerKey: string) => {
    try {
      const snapshot = await get(ref(db, `playerData/${playerKey}`));
      console.log(snapshot.val());
      const data = snapshot.val();

      return data;
    } catch (err) {
      console.error("Error fetching player stats:", err);
      return null;
    }
  };

  return (
    <PlayerDataContext.Provider value={{ getPlayerStats }}>
      {children}
    </PlayerDataContext.Provider>
  );
};
