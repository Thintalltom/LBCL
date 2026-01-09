import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Plus, Trash2, MapPin, Phone, Home, Building2 } from 'lucide-react';
import { useClubs } from '../context/ClubContext';
import { usePlayers } from '../context/PlayerContext';
import { useCoaches } from '../context/CoachContext';
import { PlayerTable } from '../components/PlayerTable';
import { CoachCard } from '../components/CoachCard';
import { PlayerFormModal } from '../components/PlayerFormModal';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
export function ClubDetailsPage() {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const {
    getClub,
    deleteClub
  } = useClubs();
  const {
    getPlayersByClub,
    deletePlayersByClub
  } = usePlayers();
  const {
    getCoachesByClub,
    deleteCoachesByClub
  } = useCoaches();
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const club = getClub(id || '');
  if (!club) {
    return <div className="text-center py-12">
      <h2 className="text-xl font-semibold text-gray-900">Club not found</h2>
      <Button variant="ghost" onClick={() => navigate('/')} className="mt-4">
        Go back home
      </Button>
    </div>;
  }
  const players = getPlayersByClub(club.id);
  const coaches = getCoachesByClub(club.id);
  const headCoach = coaches.find(c => c.type === 'head');
  const assistantCoach = coaches.find(c => c.type === 'assistant');
  const handleDeleteClub = () => {
    deletePlayersByClub(club.id);
    deleteCoachesByClub(club.id);
    deleteClub(club.id);
    navigate('/');
  };
  return <div className="space-y-8">
    {/* Header & Breadcrumb */}
    <div>
      <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-4">
        <ChevronLeft className="h-4 w-4 mr-1" /> Back to Clubs
      </Link>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex items-start space-x-4">
          {club.logo && <img src={club.logo} alt="" className="h-20 w-20 rounded-full object-cover border-2 border-gray-200 flex-shrink-0" />}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{club.name}</h1>
            <p className="text-sm text-gray-500 mt-1">
              Registered on {new Date(club.createdAt).toLocaleDateString()}
            </p>

            {/* Club Details */}
            <div className="mt-4 space-y-2">
              {club.address && <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                <span>{club.address}</span>
              </div>}
              {club.lga && <div className="flex items-center text-sm text-gray-600">
                <Building2 className="h-4 w-4 mr-2 text-gray-400" />
                <span>LGA: {club.lga}</span>
              </div>}
              {club.contact && <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                <span>{club.contact}</span>
              </div>}
              {club.homeOrAway && <div className="flex items-center text-sm text-gray-600">
                <Home className="h-4 w-4 mr-2 text-gray-400" />
                <span className="capitalize">{club.homeOrAway} Club</span>
              </div>}
            </div>
          </div>
        </div>
        <Button variant="danger" onClick={() => setIsDeleteDialogOpen(true)} className=" text-red-600 border border-red-200 hover:bg-red-50 hover:text-red-700 flex-shrink-0">
          <Trash2 className="h-4 w-4 mr-2" /> Delete Club
        </Button>
      </div>
    </div>

    {/* Coaching Staff Section */}
    <section>
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        Coaching Staff
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CoachCard coach={headCoach} type="head" clubId={club.id} />
        <CoachCard coach={assistantCoach} type="assistant" clubId={club.id} />
      </div>
    </section>

    {/* Players Section */}
    <section>
      <Card title={`Squad List (${players.length}/20)`} action={<Button size="sm" onClick={() => setIsPlayerModalOpen(true)} disabled={players.length >= 20}>
        <Plus className="h-4 w-4 mr-2" /> Register Player
      </Button>}>
        <PlayerTable players={players} clubId={club.id} />
      </Card>
    </section>

    <PlayerFormModal isOpen={isPlayerModalOpen} onClose={() => setIsPlayerModalOpen(false)} clubId={club.id} />

    <ConfirmDialog isOpen={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)} onConfirm={handleDeleteClub} title="Delete Club" message={`Are you sure you want to delete ${club.name}? This will permanently remove the club and all associated players and coaches. This action cannot be undone.`} confirmText="Delete Club" variant="danger" />
  </div>;
}