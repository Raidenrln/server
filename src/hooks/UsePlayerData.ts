import { useContext } from "react";
import { PlayerDataContext } from "../context/PlayerDataContext";

export const UsePlayerData = () => {
  const context = useContext(PlayerDataContext);
  if (context === undefined) {
    throw new Error("UsePlayerData must be used within PlayerDataProvider");
  }
  return context;
};
