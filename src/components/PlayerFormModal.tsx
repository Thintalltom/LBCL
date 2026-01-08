import React, { useEffect, useState } from 'react';
import { Player } from '../types';
import { usePlayers } from '../context/PlayerContext';
import { Modal } from './ui/Modal';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Button } from './ui/Button';
import { Upload } from 'lucide-react';
interface PlayerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  clubId: string;
  playerToEdit?: Player;
}
export function PlayerFormModal({
  isOpen,
  onClose,
  clubId,
  playerToEdit
}: PlayerFormModalProps) {
  const {
    addPlayer,
    updatePlayer
  } = usePlayers();
  const initialFormState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    jerseyNumber: '',
    jerseyColor: '',
    height: '',
    weight: '',
    sex: 'Male',
    dateOfBirth: '',
    profileImage: ''
  };
  const [formData, setFormData] = useState(initialFormState);
  useEffect(() => {
    if (playerToEdit) {
      setFormData({
        firstName: playerToEdit.firstName,
        lastName: playerToEdit.lastName,
        email: playerToEdit.email,
        phone: playerToEdit.phone,
        jerseyNumber: playerToEdit.jerseyNumber.toString(),
        jerseyColor: playerToEdit.jerseyColor,
        height: playerToEdit.height.toString(),
        weight: playerToEdit.weight.toString(),
        sex: playerToEdit.sex,
        dateOfBirth: playerToEdit.dateOfBirth,
        profileImage: playerToEdit.profileImage || ''
      });
    } else {
      setFormData(initialFormState);
    }
  }, [playerToEdit, isOpen]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size must be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          profileImage: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const playerData = {
      clubId,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      jerseyNumber: parseInt(formData.jerseyNumber),
      jerseyColor: formData.jerseyColor,
      height: parseFloat(formData.height),
      weight: parseFloat(formData.weight),
      sex: formData.sex as 'Male' | 'Female',
      dateOfBirth: formData.dateOfBirth,
      profileImage: formData.profileImage || undefined
    };
    if (playerToEdit) {
      updatePlayer(playerToEdit.id, playerData);
    } else {
      addPlayer(playerData);
    }
    onClose();
  };
  return <Modal isOpen={isOpen} onClose={onClose} title={playerToEdit ? 'Edit Player' : 'Register New Player'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Picture
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer transition-colors">
              <Upload className="h-4 w-4 mr-2" />
              Upload Photo
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
            {formData.profileImage && <img src={formData.profileImage} alt="Preview" className="h-16 w-16 rounded-full object-cover border border-gray-200" />}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input label="First Name *" name="firstName" value={formData.firstName} onChange={handleChange} required />
          <Input label="Last Name *" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input label="Email *" name="email" type="email" value={formData.email} onChange={handleChange} required />
          <Input label="Phone *" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input label="Date of Birth *" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} required />
          <Select label="Sex *" name="sex" value={formData.sex} onChange={handleChange} options={[{
          value: 'Male',
          label: 'Male'
        }, {
          value: 'Female',
          label: 'Female'
        }]} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input label="Height (cm) *" name="height" type="number" value={formData.height} onChange={handleChange} required />
          <Input label="Weight (kg) *" name="weight" type="number" value={formData.weight} onChange={handleChange} required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input label="Jersey Number *" name="jerseyNumber" type="number" value={formData.jerseyNumber} onChange={handleChange} required />
          <Input label="Jersey Color *" name="jerseyColor" value={formData.jerseyColor} onChange={handleChange} required />
        </div>

        <div className="pt-4 flex justify-end space-x-3">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {playerToEdit ? 'Save Changes' : 'Register Player'}
          </Button>
        </div>
      </form>
    </Modal>;
}