import React, { useEffect, useState, createContext, useContext } from 'react';
import { Club } from '../types';
import { storage } from '../utils/storage';
import { toast } from 'sonner';
interface ClubContextType {
  clubs: Club[];
  addClub: (club: Omit<Club, 'id' | 'createdAt'>) => void;
  deleteClub: (id: string) => void;
  getClub: (id: string) => Club | undefined;
}
const ClubContext = createContext<ClubContextType | undefined>(undefined);
export function ClubProvider({
  children
}: {
  children: ReactNode;
}) {
  const [clubs, setClubs] = useState<Club[]>([]);
  useEffect(() => {
    const loadedClubs = storage.get<Club[]>(storage.keys.CLUBS, []);
    setClubs(loadedClubs);
  }, []);
  useEffect(() => {
    storage.set(storage.keys.CLUBS, clubs);
  }, [clubs]);
  const addClub = (clubData: Omit<Club, 'id' | 'createdAt'>) => {
    const newClub: Club = {
      ...clubData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    setClubs(prev => [...prev, newClub]);
    toast.success('Club registered successfully', {
      description: `${newClub.name} has been added to the league.`
    });
  };
  const deleteClub = (id: string) => {
    const club = clubs.find(c => c.id === id);
    setClubs(prev => prev.filter(club => club.id !== id));
    if (club) {
      toast.success('Club deleted', {
        description: `${club.name} has been removed from the league.`
      });
    }
  };
  const getClub = (id: string) => {
    return clubs.find(club => club.id === id);
  };
  return <ClubContext.Provider value={{
    clubs,
    addClub,
    deleteClub,
    getClub
  }}>
      {children}
    </ClubContext.Provider>;
}
export function useClubs() {
  const context = useContext(ClubContext);
  if (context === undefined) {
    throw new Error('useClubs must be used within a ClubProvider');
  }
  return context;
}