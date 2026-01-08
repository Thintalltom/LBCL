export interface Club {
  id: string;
  name: string;
  logo?: string;
  address?: string;
  lga?: string;
  contact?: string;
  homeOrAway?: 'home' | 'away';
  createdAt: string;
}
export interface Player {
  id: string;
  clubId: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
  jerseyNumber: number;
  sex: 'Male' | 'Female';
  email: string;
  phone: string;
  height: number; // cm
  weight: number; // kg
  dateOfBirth: string;
  jerseyColor: string;
}
export interface Coach {
  id: string;
  clubId: string;
  type: 'head' | 'assistant';
  fullName: string;
  profileImage?: string;
  phone: string;
  email: string;
  address: string;
  sex: 'Male' | 'Female';
}