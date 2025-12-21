// PlayerContent.tsx
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { ref, query, orderByChild, get } from "firebase/database";
import { db } from "../../services/firebase";
import PlayerStatsModal from "./PlayerStatsModal";

interface UserWithKey {
  _key: string;
  name: string;
  uuid: string;
}

const PAGE_SIZE = 50;

const PlayerContent = () => {
  const [players, setPlayers] = useState<UserWithKey[]>([]);
  const [displayedPlayers, setDisplayedPlayers] = useState<UserWithKey[]>([]);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState<UserWithKey | null>(null);

  const initialized = useRef(false);

  const fetchPlayers = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const playersQuery = query(ref(db, "usercache"), orderByChild("name"));
      const snapshot = await get(playersQuery);
      const data = snapshot.val();

      if (!data) {
        setHasMore(false);
        return;
      }

      const fetchedPlayers: UserWithKey[] = Object.entries(data).map(([key, value]: any) => ({
        _key: key,
        name: value.name,
        uuid: value.uuid,
      }));

      const newPlayers = lastKey
        ? fetchedPlayers.filter(p => players.every(prev => prev._key !== p._key)).slice(0, PAGE_SIZE)
        : fetchedPlayers.slice(0, PAGE_SIZE);

      setPlayers(prev => [...prev, ...newPlayers]);
      setDisplayedPlayers(prev => [...prev, ...newPlayers]);
      setLastKey(newPlayers[newPlayers.length - 1]?._key || lastKey);

      if (newPlayers.length < PAGE_SIZE) setHasMore(false);
    } catch (err) {
      console.error("Error fetching players:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      fetchPlayers();
    }
  }, []);

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    const queryValue = e.target.value.toLowerCase();
    setSearchQuery(queryValue);

    if (!queryValue) {
      setDisplayedPlayers(players);
      return;
    }

    setLoading(true);
    try {
      const snapshot = await get(ref(db, "usercache"));
      const data = snapshot.val();

      if (!data) {
        setDisplayedPlayers([]);
        return;
      }

      const allPlayers: UserWithKey[] = Object.entries(data).map(([key, value]: any) => ({
        _key: key,
        name: value.name,
        uuid: value.uuid,
      }));

      const filtered = allPlayers.filter(p => p.name.toLowerCase().includes(queryValue));
      setDisplayedPlayers(filtered);
    } catch (err) {
      console.error("Error searching players:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Players</h2>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search players..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>

      {/* Player Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayedPlayers.map(player => (
          <div
            key={player._key}
            className="flex flex-col rounded-xl border shadow-sm bg-white cursor-pointer transition hover:shadow-md"
            onClick={() => setSelectedPlayer(player)}
          >
            <div className="flex items-center justify-between p-2">
              <p className="text-lg font-semibold text-gray-800 truncate">{player.name}</p>
              <img
                src="https://imgur.com/81eYBFe.png"
                className="h-16 w-16 object-cover rounded-lg"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Load Button */}
      {!searchQuery && hasMore && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={fetchPlayers}
            disabled={loading}
            className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      {/* Player Stats Modal */}
      {selectedPlayer && (
        <PlayerStatsModal
          playerKey={selectedPlayer.uuid}
          playerName={selectedPlayer.name}
          onClose={() => setSelectedPlayer(null)}
        />
      )}
    </div>
  );
};

export default PlayerContent;
