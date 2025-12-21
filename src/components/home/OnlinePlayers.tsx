import { useServerStatus } from "../../hooks/UseServerStatus";
const OnlinePlayers = () => {
  const status = useServerStatus();
  const isOnline = status.online;
  return (
    <div className="w-full">
      {/* Player List */}
        {isOnline && status.players.list && status.players.list.length > 0 && (
          <div>
            <p className="text-sm text-gray-500 mb-2">Online Players</p>
<ul
  className="
    grid gap-2
    grid-cols-1         
    sm:grid-cols-2      
    md:grid-cols-3       
    lg:grid-cols-4      
    xl:grid-cols-5      
    auto-rows-auto       
    max-h-[calc(10*2rem)] overflow-y-auto
  "
>
              {status.players.list.map((playerName, index) => (
                <li
                  key={index}
                  className="px-3 py-1 rounded-md bg-gray-200 text-gray-900 text-sm"
                >
                  {playerName}
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  )
}

export default OnlinePlayers
