import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClubs } from '../context/ClubContext';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Card } from './ui/Card';
import { Upload } from 'lucide-react';
export function ClubForm() {
  const navigate = useNavigate();
  const {
    addClub,
    clubs
  } = useClubs();
  const [name, setName] = useState('');
  const [logo, setLogo] = useState('');
  const [address, setAddress] = useState('');
  const [lga, setLga] = useState('');
  const [contact, setContact] = useState('');
  const [homeOrAway, setHomeOrAway] = useState<'home' | 'away' | ''>('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError('Image size must be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (name.trim().length < 2) {
      setError('Club name must be at least 2 characters long');
      return;
    }
    if (clubs.some(c => c.name.toLowerCase() === name.trim().toLowerCase())) {
      setError('A club with this name already exists');
      return;
    }
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    addClub({
      name: name.trim(),
      logo: logo || undefined,
      address: address.trim() || undefined,
      lga: lga.trim() || undefined,
      contact: contact.trim() || undefined,
      homeOrAway: homeOrAway || undefined
    });
    setIsSubmitting(false);
    navigate('/');
  };
  return <Card className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-1">
            Club Details
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Register a new club to the league.
          </p>

          <div className="space-y-4">
            <Input label="Club Name *" placeholder="e.g. Lagos Warriors" value={name} onChange={e => setName(e.target.value)} error={error} autoFocus />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Club Logo
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer transition-colors">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Logo
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>
                {logo && <img src={logo} alt="Logo preview" className="h-16 w-16 rounded-full object-cover border border-gray-200" />}
              </div>
            </div>

            <Input label="Address" placeholder="e.g. 123 Basketball Street, Lagos" value={address} onChange={e => setAddress(e.target.value)} />

            <Input label="LGA (Local Government Area)" placeholder="e.g. Ikeja" value={lga} onChange={e => setLga(e.target.value)} />

            <Input label="Contact Information" placeholder="e.g. +234 123 456 7890" value={contact} onChange={e => setContact(e.target.value)} />

            <Select label="Home or Away Club" value={homeOrAway} onChange={e => setHomeOrAway(e.target.value as 'home' | 'away')} options={[{
            value: 'home',
            label: 'Home Club'
          }, {
            value: 'away',
            label: 'Away Club'
          }]} />
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-100">
          <Button type="button" variant="secondary" onClick={() => navigate('/')}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            Register Club
          </Button>
        </div>
      </form>
    </Card>;
}