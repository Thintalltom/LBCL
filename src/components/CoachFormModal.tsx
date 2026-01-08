import React, { useEffect, useState } from 'react';
import { Coach } from '../types';
import { useCoaches } from '../context/CoachContext';
import { Modal } from './ui/Modal';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Button } from './ui/Button';
import { Upload } from 'lucide-react';
interface CoachFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  clubId: string;
  type: 'head' | 'assistant';
  coachToEdit?: Coach;
}
export function CoachFormModal({
  isOpen,
  onClose,
  clubId,
  type,
  coachToEdit
}: CoachFormModalProps) {
  const {
    addCoach,
    updateCoach
  } = useCoaches();
  const initialFormState = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    sex: 'Male',
    profileImage: ''
  };
  const [formData, setFormData] = useState(initialFormState);
  useEffect(() => {
    if (coachToEdit) {
      setFormData({
        fullName: coachToEdit.fullName,
        email: coachToEdit.email,
        phone: coachToEdit.phone,
        address: coachToEdit.address,
        sex: coachToEdit.sex,
        profileImage: coachToEdit.profileImage || ''
      });
    } else {
      setFormData(initialFormState);
    }
  }, [coachToEdit, isOpen]);
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
    const coachData = {
      clubId,
      type,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      sex: formData.sex as 'Male' | 'Female',
      profileImage: formData.profileImage || undefined
    };
    if (coachToEdit) {
      updateCoach(coachToEdit.id, coachData);
    } else {
      addCoach(coachData);
    }
    onClose();
  };
  return <Modal isOpen={isOpen} onClose={onClose} title={`${coachToEdit ? 'Edit' : 'Register'} ${type === 'head' ? 'Head' : 'Assistant'} Coach`}>
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

        <Input label="Full Name *" name="fullName" value={formData.fullName} onChange={handleChange} required />

        <div className="grid grid-cols-2 gap-4">
          <Input label="Email *" name="email" type="email" value={formData.email} onChange={handleChange} required />
          <Input label="Phone *" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
        </div>

        <Input label="Address *" name="address" value={formData.address} onChange={handleChange} required />

        <Select label="Sex *" name="sex" value={formData.sex} onChange={handleChange} options={[{
        value: 'Male',
        label: 'Male'
      }, {
        value: 'Female',
        label: 'Female'
      }]} />

        <div className="pt-4 flex justify-end space-x-3">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save Coach</Button>
        </div>
      </form>
    </Modal>;
}