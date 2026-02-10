import React, { useEffect, useState } from 'react';
import { Coach } from '../types';
import { Modal } from './ui/Modal';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Button } from './ui/Button';
import { Upload } from 'lucide-react';
import { toast, Toaster  } from 'sonner';
import { useCreateCoachMutation, useUpdateCoachMutation } from '../store/api/endpoints/coachApi';
import { useGetClubQuery } from '../store/api/endpoints/clubApi';
interface CoachFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  clubId: string;
  type: 'Head Coach' | 'Assistant Coach';
  coachToEdit?: Coach;
}
export function CoachFormModal({
  isOpen,
  onClose,
  clubId,
  type,
  coachToEdit
}: CoachFormModalProps) {
  
  const [updateCoach] = useUpdateCoachMutation();
  const initialFormState = {
    full_name: '',
    email: '',
    contact_information: '',
    address: '',
    sex: 'male',
    photo: '',
  };
  const { refetch } = useGetClubQuery(clubId);
  const [createCoach] = useCreateCoachMutation();
  const [formData, setFormData] = useState(initialFormState);
  useEffect(() => {
    if (coachToEdit) {
      setFormData({
        full_name: coachToEdit.full_name,
        email: coachToEdit.email,
        contact_information: coachToEdit.contact_information,
        address: coachToEdit.address,
        sex: coachToEdit.sex,
        photo: coachToEdit.photo || ''
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
        toast.error('Image size must be less than 2MB');
        return;
      }

      uploadToCloudinary(file).then((cloudinaryUrl) => {

        setFormData(prev => ({
          ...prev,
          photo: cloudinaryUrl
        }));
        toast.success('Coach photo uploaded successfully');
      }).catch((error) => {
        toast.error('Failed to upload image', error);

      });
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
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const coachData = {
      clubId,
      'full_name': formData.full_name,
      'photo': formData.photo || undefined,
      'address': formData.address,
      'sex': formData.sex as 'male' | 'female',
      'email': formData.email,
      'contact_information': formData.contact_information,
      'role': type,
    };

    try {
      if (coachToEdit && coachToEdit._id) {
        await updateCoach({ id: coachToEdit._id, data: coachData });
        toast.success('Coach updated successfully');
      } else {
        await createCoach(coachData);
        toast.success('Coach created successfully');
      }
      await refetch();
      onClose();
    } catch (error) {
      toast.error('Failed to save coach');
    }
  };
  return(
  <>
  <Toaster />
   <Modal isOpen={isOpen} onClose={onClose} title={`${coachToEdit ? 'Edit' : 'Register'} ${type === 'Head Coach' ? 'Head Coach' : 'Assistant Coach'}`}>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm  text-left font-medium text-gray-700 mb-2">
          Profile Picture
        </label>
        <div className="flex items-center space-x-4">
          <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer transition-colors">
            <Upload className="h-4 w-4 mr-2" />
            Upload Photo
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
          {formData.photo && <img src={formData.photo} alt="Preview" className="h-16 w-16 rounded-full object-cover border border-gray-200" />}
        </div>
      </div>

      <Input label="Full Name *" name="full_name" value={formData.full_name} onChange={handleChange} required />


      <Input label="Email *" name="email" type="email" value={formData.email} onChange={handleChange} required />


      <Input label="Address *" name="address" value={formData.address} onChange={handleChange} required />
      <Input label="Phone *" name="contact_information" value={formData.contact_information} onChange={handleChange} required />
      <Select label="Sex *" name="sex" value={formData.sex} onChange={handleChange} options={[{
        value: 'male',
        label: 'Male'
      }, {
        value: 'female',
        label: 'Female'
      }]} />

      <div className="pt-4 flex justify-end space-x-3">
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Save Coach</Button>
      </div>
    </form>
  </Modal>
  </>
  );
}