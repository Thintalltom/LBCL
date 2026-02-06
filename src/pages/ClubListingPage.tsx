import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Trophy } from 'lucide-react';
import { useClubs } from '../context/ClubContext';
import { ClubsTable } from '../components/ClubsTable';
import { EmptyState } from '../components/EmptyState';
import { Button } from '../components/ui/Button';
import { useGetClubsQuery } from '../store/api/endpoints/clubApi';
export function ClubListingPage() {
  const {
    clubs
  } = useClubs();
  const navigate = useNavigate();
   const { data: clubsData } = useGetClubsQuery();
    
  return <div className="space-y-6">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Registered Clubs</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage all clubs in the LAGOS BASKETBALL COMMUNITY LEAGUE.
        </p>
      </div>
      <Button onClick={() => navigate('/clubs/new')}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Add New Club
      </Button>
    </div>

    {clubsData && clubsData.length === 0 ? <EmptyState icon={Trophy} title="No clubs registered yet" description="Get started by registering the first club in the league. You'll be able to add players and coaches afterwards." actionLabel="Register First Club" onAction={() => navigate('/clubs/new')} /> : <ClubsTable clubs={clubsData} />}
  </div>;
}