import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../services/firebase";
import type { UserCache } from "../models/UserModel";

const defaultUserCache: UserCache = {};

export const UserCacheContext = createContext<UserCache | undefined>(undefined);

export const UserCacheProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<UserCache>(defaultUserCache);

  useEffect(() => {
    const usersRef = ref(db, "usercache");

    const unsubscribe = onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        setUsers(snapshot.val());
      } else {
        setUsers({});
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserCacheContext.Provider value={users}>
      {children}
    </UserCacheContext.Provider>
  );
};
