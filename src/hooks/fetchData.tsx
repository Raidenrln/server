import { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "../services/firebase";

export default function ServerStatus() {
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const snapshot = await get(ref(db, "serverStatus"));
        if (snapshot.exists()) {
          setStatus(snapshot.val());
        }
      } catch (err) {
        console.error("Error fetching server status:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  return <pre>{JSON.stringify(status, null, 2)}</pre>;
}
