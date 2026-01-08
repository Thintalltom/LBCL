import React, { useEffect, useState, createContext, useContext } from 'react';
import { Coach } from '../types';
import { storage } from '../utils/storage';
import { toast } from 'sonner';
interface CoachContextType {
  coaches: Coach[];
  getCoachesByClub: (clubId: string) => Coach[];
  addCoach: (coach: Omit<Coach, 'id'>) => void;
  updateCoach: (id: string, coach: Partial<Coach>) => void;
  deleteCoach: (id: string) => void;
  deleteCoachesByClub: (clubId: string) => void;
}
const CoachContext = createContext<CoachContextType | undefined>(undefined);
export function CoachProvider({
  children
}: {
  children: ReactNode;
}) {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  useEffect(() => {
    const loadedCoaches = storage.get<Coach[]>(storage.keys.COACHES, []);
    setCoaches(loadedCoaches);
  }, []);
  useEffect(() => {
    storage.set(storage.keys.COACHES, coaches);
  }, [coaches]);
  const getCoachesByClub = (clubId: string) => {
    return coaches.filter(c => c.clubId === clubId);
  };
  const addCoach = (coachData: Omit<Coach, 'id'>) => {
    const newCoach: Coach = {
      ...coachData,
      id: crypto.randomUUID()
    };
    setCoaches(prev => [...prev, newCoach]);
    toast.success(`${coachData.type === 'head' ? 'Head' : 'Assistant'} coach registered`, {
      description: `${newCoach.fullName} has been added to the coaching staff.`
    });
  };
  const updateCoach = (id: string, updates: Partial<Coach>) => {
    setCoaches(prev => prev.map(c => c.id === id ? {
      ...c,
      ...updates
    } : c));
    toast.success('Coach updated', {
      description: 'Coach information has been updated successfully.'
    });
  };
  const deleteCoach = (id: string) => {
    const coach = coaches.find(c => c.id === id);
    setCoaches(prev => prev.filter(c => c.id !== id));
    if (coach) {
      toast.success('Coach removed', {
        description: `${coach.fullName} has been removed from the coaching staff.`
      });
    }
  };
  const deleteCoachesByClub = (clubId: string) => {
    setCoaches(prev => prev.filter(c => c.clubId !== clubId));
  };
  return <CoachContext.Provider value={{
    coaches,
    getCoachesByClub,
    addCoach,
    updateCoach,
    deleteCoach,
    deleteCoachesByClub
  }}>
      {children}
    </CoachContext.Provider>;
}
export function useCoaches() {
  const context = useContext(CoachContext);
  if (context === undefined) {
    throw new Error('useCoaches must be used within a CoachProvider');
  }
  return context;
}