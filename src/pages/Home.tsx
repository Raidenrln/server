import EventCard from "../components/EventCard";
import OnlinePlayers from "../components/OnlinePlayers";
import ServerStatus from "../components/ServerStatus";
import TotalPlayers from "../components/TotalPlayers";
import { UserCacheProvider } from "../context/FetchTotalPlayerContext";

const Home: React.FC = () => {
  return (
    <UserCacheProvider>
      <div className="w-full p-2 space-y-4">
        {/* Top Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Server Status */}
          <div className="flex flex-col h-full">
            <ServerStatus />
          </div>

          {/* Total Players */}
          <div className="flex flex-col h-full">
            <TotalPlayers />
          </div>

          {/* Event Card: spans full width on small screens */}
          <div className="flex flex-col col-span-1 sm:col-span-2 lg:col-span-1 h-full">
            <EventCard />
          </div>
        </div>

        {/* Online Players */}
        <div className="w-full">
          <OnlinePlayers />
        </div>
      </div>
    </UserCacheProvider>
  );
};

export default Home;
