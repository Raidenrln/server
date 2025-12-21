import { useContext } from "react";
import { UserCacheContext } from "../context/UserCacheContext";

export const useUserCache = () => {
  const context = useContext(UserCacheContext);

  if (context === undefined) {
    throw new Error("useUserCache must be used within UserCacheProvider");
  }

  return context;
};
