import PlayerContent from '../components/players/PlayerContent'
import { PlayerDataProvider } from '../context/PlayerDataContext'
import { UserCacheProvider } from '../context/UserCacheContext'


const Players = () => {
  return (
    <div>
    <UserCacheProvider>
      <PlayerDataProvider>
        <PlayerContent/>
      </PlayerDataProvider>
    </UserCacheProvider>

    </div>
  )
}

export default Players
