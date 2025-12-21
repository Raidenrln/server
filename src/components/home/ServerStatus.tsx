import { useServerStatus } from "../../hooks/UseServerStatus";

const ServerStatus: React.FC = () => {
  const status = useServerStatus();
  const isOnline = status.online;

  const version = status.version ? status.version.replace(/^Paper\s*/, "") : "Unknown";

  const formattedTime = status.lastUpdated
    ? new Date(status.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : "—";

  return (
    <div className="flex w-full items-center text-gray-900">
      <div className="w-full rounded-xl border border-gray-300 p-6 space-y-4 shadow-sm hover:shadow-lg">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-center">
          Server Status
        </h1>

        {/* Online / Offline Circle */}
        <div className="flex justify-center">
          <div
            className={`w-24 h-24 rounded-full border-4 flex items-center justify-center
              ${isOnline ? "border-green-500 text-green-600" : "border-red-500 text-red-600"}`}
          >
            <span className="font-semibold">
              {isOnline ? "ONLINE" : "OFFLINE"}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-medium text-gray-500">Ping:</span>{" "}
            {isOnline ? `${status.ping ?? "--"} ms` : "offline"}
          </p>

          <p>
            <span className="font-medium text-gray-500">Players:</span>{" "}
            {isOnline ? `${status.players.online} / ${status.players.max}` : "offline"}
          </p>

          <p>
            <span className="font-medium text-gray-500">Version:</span>{" "}
            {version}
          </p>

          <p className="text-xs text-gray-400">
            Last Updated: {formattedTime}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServerStatus;
