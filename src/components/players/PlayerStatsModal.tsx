import { useEffect, useState, useMemo } from "react";
import { UsePlayerData } from "../../hooks/UsePlayerData";
import { cmToKm, formatKey } from "../../utils/distances";
import { getBaseKeyTime, ticksToDays } from "../../utils/time";

interface PlayerStatsModalProps {
  playerKey: string;
  playerName: string;
  onClose: () => void;
}

const PlayerStatsModal = ({ playerKey, playerName, onClose }: PlayerStatsModalProps) => {
  const { getPlayerStats } = UsePlayerData();

  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch initial data once for modal structure
  useEffect(() => {
    const fetchStatsOnce = async () => {
      setLoading(true);
      const data = await getPlayerStats(playerKey);
      setStats(data?.stats || null);
      setLoading(false);
    };
    fetchStatsOnce();
  }, [playerKey, getPlayerStats]);

  // Interval to update only stats
  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await getPlayerStats(playerKey);
      setStats(data?.stats || null); // only stats state updates
    }, 5000); // every 5s

    return () => clearInterval(interval);
  }, [playerKey, getPlayerStats]);

  const toggleExpand = (key: string) => {
    setExpandedKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(key)) newSet.delete(key);
      else newSet.add(key);
      return newSet;
    });
  };

  const renderStats = (obj: any, parentKey = "") =>
    Object.entries(obj).map(([key, value]) => {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;

      if (searchQuery && !fullKey.toLowerCase().includes(searchQuery.toLowerCase())) {
        if (typeof value === "object" && value !== null) {
          const childMatches = Object.keys(value).some(k =>
            `${fullKey}.${k}`.toLowerCase().includes(searchQuery.toLowerCase())
          );
          if (!childMatches) return null;
        } else return null;
      }

      const formattedKey = formatKey(key);

      if (typeof value === "number") {
        let displayValue: string | number = value;
        let unit = "";

        if (key.endsWith("_one_cm")) {
          displayValue = cmToKm(value);
          unit = " km";
        }

        const baseKeyTime = getBaseKeyTime(key);
        if (baseKeyTime.endsWith("_ticks") || baseKeyTime.endsWith("_time") || baseKeyTime.startsWith("time_")) {
          displayValue = ticksToDays(value);
          unit = " days";
        }

        return (
          <li
            key={fullKey}
            className="px-2 py-1 bg-gray-100 rounded mb-1 flex justify-between hover:bg-gray-200 transition"
          >
            <span className="font-bold text-gray-700">{formattedKey}</span>
            <span className="font-mono text-gray-900">{displayValue}{unit}</span>
          </li>
        );
      }

      if (typeof value === "object" && value !== null) {
        const isExpanded = expandedKeys.has(fullKey);
        return (
          <li key={fullKey} className="mb-2">
            <button
              onClick={() => toggleExpand(fullKey)}
              className="w-full text-left font-bold text-gray-800 mb-1 flex justify-between items-center px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 transition"
            >
              {formattedKey}
              <span
                className={`ml-2 transition-transform duration-200 ${
                  expandedKeys.has(fullKey) ? "rotate-90" : "rotate-0"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
            {isExpanded && (
              <ul className="ml-4 border-l border-gray-900 pl-3">
                {renderStats(value, fullKey)}
              </ul>
            )}
          </li>
        );
      }

      return null;
    });

  const filteredStats = useMemo(() => {
    if (!stats) return null;
    if (!searchQuery) return stats;
    return stats;
  }, [stats, searchQuery]);

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-9999 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white text-gray-900 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-300 p-4 flex flex-col gap-2 z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">{playerName} Stats</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 font-bold text-2xl"
            >
              ×
            </button>
          </div>
          <input
            type="text"
            placeholder="Search stats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        {/* Stats content */}
        <div className="p-4 space-y-4">
          {loading ? (
            <p className="text-gray-500">Loading stats...</p>
          ) : filteredStats ? (
            <ul className="space-y-2">{renderStats(filteredStats)}</ul>
          ) : (
            <p className="text-gray-400">No stats available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerStatsModal;
