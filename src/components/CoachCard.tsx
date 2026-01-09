import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Edit2, Trash2, Plus } from 'lucide-react';
import { Coach } from '../types';
import { useCoaches } from '../context/CoachContext';
import { CoachFormModal } from './CoachFormModal';
import { ConfirmDialog } from './ui/ConfirmDialog';
import { Button } from './ui/Button';
interface CoachCardProps {
  coach?: Coach;
  type: 'head' | 'assistant';
  clubId: string;
}
export function CoachCard({
  coach,
  type,
  clubId
}: CoachCardProps) {
  const {
    deleteCoach
  } = useCoaches();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const handleDeleteConfirm = () => {
    if (coach) {
      deleteCoach(coach.id);
    }
  };
  const title = type === 'head' ? 'Head Coach' : 'Assistant Coach';
  console.log('title', title);
  if (!coach) {
    return <>
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center text-center h-full min-h-[200px] hover:border-[#FF6B35] hover:bg-orange-50/30 transition-all group">
          <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-3 group-hover:bg-orange-100 transition-colors">
            <User className="h-6 w-6 text-gray-400 group-hover:text-[#FF6B35]" />
          </div>
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
          <p className="text-xs text-gray-500 mt-1 mb-4">Not assigned yet</p>
          <Button size="sm" variant="secondary" onClick={() => setIsModalOpen(true)}>
            <Plus className="h-4 w-4 mr-1" /> Add Coach
          </Button>
        </div>
        <CoachFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} clubId={clubId} type={type} />
      </>;
  }
  return <>
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm relative group h-full">
        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => setIsModalOpen(true)} className="p-1 text-gray-400 hover:text-[#FF6B35] rounded transition-colors">
            <Edit2 className="h-4 w-4" />
          </button>
          <button onClick={() => setIsDeleteDialogOpen(true)} className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            {coach.profileImage ? <img src={coach.profileImage} alt="" className="h-16 w-16 rounded-full object-cover border border-gray-100" /> : <div className="h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center text-[#FF6B35]">
                <User className="h-8 w-8" />
              </div>}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-[#FF6B35] uppercase tracking-wide mb-1">
              {title}
            </p>
            <h3 className="text-lg font-bold text-gray-900 truncate">
              {coach.fullName}
            </h3>
            <div className="mt-3 space-y-2">
              <div className="flex items-center text-sm text-gray-500">
                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                <span className="truncate">{coach.email}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                <span>{coach.phone}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                <span className="truncate">{coach.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CoachFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} clubId={clubId} type={type} coachToEdit={coach} />

      <ConfirmDialog isOpen={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)} onConfirm={handleDeleteConfirm} title="Remove Coach" message={`Are you sure you want to remove ${coach.fullName} from the coaching staff? This action cannot be undone.`} confirmText="Remove Coach" variant="danger" />
    </>;
}