import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../services/firebase";

interface ServerStatus {
  online: number;
  max: number;
}

interface ServerStatusContextProps extends ServerStatus {}

const ServerStatusContext = createContext<ServerStatusContextProps | undefined>(undefined);

export const ServerStatusProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [online, setOnline] = useState(0);
  const [max, setMax] = useState(30);

  useEffect(() => {
    const statusRef = ref(db, "serverStatus");
    const unsubscribe = onValue(statusRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setOnline(data.players?.online || 0);
        setMax(data.players?.max || 30);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <ServerStatusContext.Provider value={{ online, max }}>
      {children}
    </ServerStatusContext.Provider>
  );
};

// Custom hook to consume the context
export const useServerStatus = () => {
  const context = useContext(ServerStatusContext);
  if (!context) {
    throw new Error("useServerStatus must be used within a ServerStatusProvider");
  }
  return context;
};
