import { useContext } from "react";
import { ServerStatusContext } from "../context/ServerStatusContext";

export const useServerStatus = () => {
  const context = useContext(ServerStatusContext);

  if (context === undefined) {
    throw new Error(
      "useServerStatus must be used within ServerStatusProvider"
    );
  }

  return context;
};
