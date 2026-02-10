export interface Club {
  _id: string;
  name: string;
  club_logo?: string;
  address?: string;
  Lga?: string;
  contact_information?: string;
  club_status?: 'home' | 'away';
  created_at: string;
  players: Player[];
  coaches: Coach[];
}
export interface Player {
  _id: string;
  club_id: string;
  first_name: string;
  last_name: string;
  photo?: string;
  jersey_number: number;
  sex: 'male' | 'female';
  email: string;
  phone_number: string;
  height: number; // cm
  weight: number; // kg
  dob: string;
  jersey_color: string;
  position?: string;

}
export interface Coach {
  id?: string;
  clubId: string;
  role: 'Head Coach' | 'Assistant Coach';
  full_name: string;
  photo?: string;
  contact_information: string;
  email: string;
  address: string;
  sex: 'male' | 'female';
  _id?: string;
}