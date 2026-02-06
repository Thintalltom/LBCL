import React, { useEffect, useState } from 'react';
import { Player } from '../types';
import { usePlayers } from '../context/PlayerContext';
import { Modal } from './ui/Modal';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Button } from './ui/Button';
import { Upload } from 'lucide-react';
import {useUpdatePlayerMutation, useCreatePlayerMutation} from '../store/api/endpoints/playerApi';
import {useGetClubQuery} from '../store/api/endpoints/clubApi';
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
  playerToEdit,
}: PlayerFormModalProps) {

  const initialFormState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    jerseyNumber: '',
    jerseyColor: '',
    height: '',
    weight: '',
    sex: 'male',
    dateOfBirth: '',
    profileImage: '',
    position : ''
  };
  const [formData, setFormData] = useState(initialFormState);
  const {refetch} = useGetClubQuery(clubId);
  const [updatePlayerApi] = useUpdatePlayerMutation();
  const [createPlayerApi] = useCreatePlayerMutation();
    const [error, setError] = useState('');
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

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        if (file.size > 2 * 1024 * 1024) {
          setError('Image size must be less than 2MB');
          return;
        }
        try {
          const cloudinaryUrl = await uploadToCloudinary(file);
            setFormData(prev => ({
          ...prev,
          profileImage: cloudinaryUrl
        }));
         
        } catch (error) {
          setError('Failed to upload image');
        }
      }
    };
    const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_players");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/ditkktpky/image/upload",
      {
        method: "POST",
        body: formData
      }
    );

    const data = await res.json();
    return data.secure_url;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const playerData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      photo: formData.profileImage || undefined,
      position: formData.position, // Default position
      height: parseFloat(formData.height),
      weight: parseFloat(formData.weight),
      dob: formData.dateOfBirth,
      jersey_number: parseInt(formData.jerseyNumber),
      jersey_color: formData.jerseyColor,
      club_id: clubId,
      sex: formData.sex as "male" | "female",
      email: formData.email,
      phone_number: formData.phone
    };
    
    try {
      if (playerToEdit) {
        await updatePlayerApi({ id: playerToEdit._id, data: playerData }).unwrap();
        refetch();
      } else {
        await createPlayerApi(playerData).unwrap();
        refetch();
      }
      onClose();
    } catch (error) {
      console.error('Error saving player:', error);
    }
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
          value: 'male',
          label: 'Male'
        }, {
          value: 'female',
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
        <div className="grid grid-cols-2 gap-4">
          {/* <Input label="Email *" name="email" type="email" value={formData.email} onChange={handleChange} required /> */}
          <Input label="Position *" name="position" value={formData.position} onChange={handleChange} required />
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