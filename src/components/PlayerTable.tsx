import React, { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Player } from '../types';
import { usePlayers } from '../context/PlayerContext';
import { PlayerFormModal } from './PlayerFormModal';
import { ConfirmDialog } from './ui/ConfirmDialog';
import { useDeletePlayerMutation } from '../store/api/endpoints/playerApi';
import { useGetClubQuery } from '../store/api/endpoints/clubApi';
interface PlayerTableProps {
  players: Player[];
  clubId: string;
}
export function PlayerTable({
  players,
  clubId
}: PlayerTableProps) {
  const [deletePlayers] = useDeletePlayerMutation();

  const [editingPlayer, setEditingPlayer] = useState<Player | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [playerToDelete, setPlayerToDelete] = useState<Player | null>(null);
  const { refetch } = useGetClubQuery(clubId);
  const handleEdit = (player: Player) => {

    setEditingPlayer(player);
    setIsModalOpen(true);
  };
  const handleDeleteClick = (player: Player) => {
    setPlayerToDelete(player);
    setDeleteDialogOpen(true);
    refetch();
  };
  const handleDeleteConfirm = () => {
    if (playerToDelete) {
      deletePlayers(playerToDelete._id);
      setPlayerToDelete(null);
      refetch();
    }
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPlayer(undefined);
  };
  if (players.length === 0) {
    return <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
      <p className="text-gray-500 text-sm">No players registered yet.</p>
    </div>;
  }
  // if (isLoading) {
  //   return <div className="text-center py-8">
  //     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
  //     <p className="mt-2 text-gray-500 text-sm">Loading players...</p>
  //   </div>;
  // }

  return <>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3.5 pl-4 pr-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Player
            </th>
            <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Jersey
            </th>
            <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stats
            </th>
            <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {players.map(player => <tr key={player._id} className="hover:bg-gray-50">
            <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6">
              <div className="flex items-center">
                <div className="h-10 w-10 flex-shrink-0">
                  {player.photo ? <img className="h-10 w-10 rounded-full object-cover" src={player.photo} alt="" /> : <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                    {player.first_name?.charAt(0)?.toUpperCase()}
                    {player.last_name?.charAt(0)?.toUpperCase()}
                  </div>}
                </div>
                <div className="ml-4">
                  <div className="font-medium text-gray-900">
                    {player.first_name} {player.last_name}
                  </div>
                  <div className="text-gray-500 text-xs">
                    {player.position} •{' '}
                    {new Date(player.dob).getFullYear()}
                  </div>
                </div>
              </div>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              <div className="flex items-center">
                <span className="font-mono font-bold text-gray-900 text-lg mr-2">
                  #{player.jersey_number}
                </span>
                <span className="w-3 h-3 rounded-full border border-gray-200" style={{
                  backgroundColor: player.jersey_color
                }} title={player.jersey_color} />
              </div>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              <div>{player.height} cm</div>
              <div>{player.weight} kg</div>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              <div>{player.phone_number}</div>
              <div>{player.email}</div>
            </td>
            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
              <div className="flex justify-end space-x-2">
                <button onClick={() => handleEdit(player)} className="text-[#FF6B35] hover:text-[#e55a2b] transition-colors">
                  <Edit2 className="h-4 w-4" />
                </button>
                <button onClick={() => handleDeleteClick(player)} className="text-red-600 hover:text-red-900 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>

    <PlayerFormModal isOpen={isModalOpen} onClose={handleCloseModal} clubId={clubId} playerToEdit={editingPlayer} />

    <ConfirmDialog isOpen={deleteDialogOpen} onClose={() => {
      setDeleteDialogOpen(false);
      setPlayerToDelete(null);
    }} onConfirm={handleDeleteConfirm} title="Remove Player" message={playerToDelete ? `Are you sure you want to remove ${playerToDelete.first_name} ${playerToDelete.last_name} from the squad? This action cannot be undone.` : ''} confirmText="Remove Player" variant="danger" />
  </>;
}