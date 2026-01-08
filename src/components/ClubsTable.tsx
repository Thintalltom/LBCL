import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Users, UserCheck, UserX } from 'lucide-react';
import { Club } from '../types';
import { usePlayers } from '../context/PlayerContext';
import { useCoaches } from '../context/CoachContext';
interface ClubsTableProps {
  clubs: Club[];
}
export function ClubsTable({
  clubs
}: ClubsTableProps) {
  const navigate = useNavigate();
  const {
    getPlayersByClub
  } = usePlayers();
  const {
    getCoachesByClub
  } = useCoaches();
  return <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
              Club Name
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Players
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Head Coach
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Assistant Coach
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {clubs.map(club => {
          const playerCount = getPlayersByClub(club.id).length;
          const coaches = getCoachesByClub(club.id);
          const hasHeadCoach = coaches.some(c => c.type === 'head');
          const hasAssistantCoach = coaches.some(c => c.type === 'assistant');
          return <tr key={club.id} className="hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => navigate(`/clubs/${club.id}`)}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  <div className="flex items-center">
                    {club.logo ? <img src={club.logo} alt="" className="h-8 w-8 rounded-full mr-3 object-cover" /> : <div className="h-8 w-8 rounded-full bg-orange-100 text-[#FF6B35] flex items-center justify-center mr-3 font-bold">
                        {club.name.charAt(0)}
                      </div>}
                    {club.name}
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1.5 text-gray-400" />
                    <span className={playerCount >= 20 ? 'text-red-600 font-medium' : ''}>
                      {playerCount} / 20
                    </span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {hasHeadCoach ? <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <UserCheck className="h-3 w-3 mr-1" /> Registered
                    </span> : <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      <UserX className="h-3 w-3 mr-1" /> Missing
                    </span>}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {hasAssistantCoach ? <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <UserCheck className="h-3 w-3 mr-1" /> Registered
                    </span> : <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      <UserX className="h-3 w-3 mr-1" /> Missing
                    </span>}
                </td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <ChevronRight className="h-5 w-5 text-gray-400 ml-auto" />
                </td>
              </tr>;
        })}
        </tbody>
      </table>
    </div>;
}