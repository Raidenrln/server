import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../services/firebase";
import type { ServerStatus } from "../models/ServerStatusModel";

const defaultStatus: ServerStatus = {
  lastUpdated: "",
  motd: "",
  online: false,
  ping: 0,
  players: { online: 0, max: 0, list: [] },
  version: ""
};

const ServerStatusContext = createContext<ServerStatus | undefined>(undefined);

export const ServerStatusProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<ServerStatus>(defaultStatus);

  useEffect(() => {
    const statusRef = ref(db, "serverStatus");
    const unsubscribe = onValue(statusRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setStatus({
          lastUpdated: data.lastUpdated || "",
          motd: data.motd || "",
          online: data.online ?? false,
          ping: data.ping ?? 0,
          players: {
            online: data.players?.online ?? 0,
            max: data.players?.max ?? 0,
            list: data.players?.list ?? []
          },
          version: data.version || ""
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <ServerStatusContext.Provider value={status}>
      {children}
    </ServerStatusContext.Provider>
  );
};

export const useServerStatus = () => {
  const context = useContext(ServerStatusContext);
  if (!context) {
    throw new Error("No context");
  }
  return context;
};
