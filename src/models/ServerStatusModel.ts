export interface Players {
  online: number;
  max: number;
  list?: string[];
}

export interface ServerStatus {
  lastUpdated: string;
  motd: string;
  online: boolean;
  ping: number;
  players: Players;
  version: string;
}
