import React, { useEffect, useState, createContext, useContext } from 'react';
import { Player } from '../types';
import { storage } from '../utils/storage';
import { toast } from 'sonner';
interface PlayerContextType {
  players: Player[];
  getPlayersByClub: (clubId: string) => Player[];
  addPlayer: (player: Omit<Player, 'id'>) => void;
  updatePlayer: (id: string, player: Partial<Player>) => void;
  deletePlayer: (id: string) => void;
  deletePlayersByClub: (clubId: string) => void;
}
const PlayerContext = createContext<PlayerContextType | undefined>(undefined);
export function PlayerProvider({
  children
}: {
  children: ReactNode;
}) {
  const [players, setPlayers] = useState<Player[]>([]);
  useEffect(() => {
    const loadedPlayers = storage.get<Player[]>(storage.keys.PLAYERS, []);
    setPlayers(loadedPlayers);
  }, []);
  useEffect(() => {
    storage.set(storage.keys.PLAYERS, players);
  }, [players]);
  const getPlayersByClub = (clubId: string) => {
    return players.filter(p => p.clubId === clubId);
  };
  const addPlayer = (playerData: Omit<Player, 'id'>) => {
    const newPlayer: Player = {
      ...playerData,
      id: crypto.randomUUID()
    };
    setPlayers(prev => [...prev, newPlayer]);
    toast.success('Player registered', {
      description: `${newPlayer.firstName} ${newPlayer.lastName} has been added to the squad.`
    });
  };
  const updatePlayer = (id: string, updates: Partial<Player>) => {
    setPlayers(prev => prev.map(p => p.id === id ? {
      ...p,
      ...updates
    } : p));
    toast.success('Player updated', {
      description: 'Player information has been updated successfully.'
    });
  };
  const deletePlayer = (id: string) => {
    const player = players.find(p => p.id === id);
    setPlayers(prev => prev.filter(p => p.id !== id));
    if (player) {
      toast.success('Player removed', {
        description: `${player.firstName} ${player.lastName} has been removed from the squad.`
      });
    }
  };
  const deletePlayersByClub = (clubId: string) => {
    setPlayers(prev => prev.filter(p => p.clubId !== clubId));
  };
  return <PlayerContext.Provider value={{
    players,
    getPlayersByClub,
    addPlayer,
    updatePlayer,
    deletePlayer,
    deletePlayersByClub
  }}>
      {children}
    </PlayerContext.Provider>;
}
export function usePlayers() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayers must be used within a PlayerProvider');
  }
  return context;
}