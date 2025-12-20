import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../services/firebase";
import type { UserCache } from "../models/UserModel";

const defaultUserCache: UserCache = {};
const UserCacheContext = createContext<UserCache | undefined>(undefined);

export const UserCacheProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<UserCache>(defaultUserCache);

  useEffect(() => {
    const usersRef = ref(db, "playerData");
    const unsubscribe = onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const data: UserCache = snapshot.val();
        setUsers(data);
      } else {
        setUsers({});
      }
    });

    return () => unsubscribe();
  }, []);

  return <UserCacheContext.Provider value={users}>{children}</UserCacheContext.Provider>;
};

export const useUserCache = () => {
  const context = useContext(UserCacheContext);
  if (!context) throw new Error("No user, error!");
  return context;
};
