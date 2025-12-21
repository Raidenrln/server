import { useUserCache } from "../../hooks/UseUserCache";

const TotalPlayers = () => {
  const userCache = useUserCache();
  const totalPlayers = Object.keys(userCache).length;

  return (
    <div className="flex w-full min-h-full items-center justify-center text-gray-900">
      <div className="w-full h-full rounded-xl border border-gray-300 p-6 shadow-md 
                      flex flex-row items-center justify-between
                      sm:flex-col sm:items-start sm:space-y-4
                      bg-white hover:shadow-lg transition-shadow">
        {/* Title */}
        <div className="w-full flex-1">
          <h1 className="w-full text-2xl font-bold text-gray-800 text-left sm:mb-4">
            Total Players
          </h1>
        </div>

        {/* Number */}
        <div className="flex justify-center sm:w-full sm:justify-end items-center">
          <p className="text-5xl font-bold text-blue-600">{totalPlayers}</p>
        </div>
      </div>
    </div>
  );
};

export default TotalPlayers;
