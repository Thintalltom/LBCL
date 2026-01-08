import React from 'react';
import { ClubForm } from '../components/ClubForm';
export function ClubRegistrationPage() {
  return <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Register New Club</h1>
        <p className="text-sm text-gray-500 mt-1">
          Create a new club profile to start managing players and staff.
        </p>
      </div>
      <ClubForm />
    </div>;
}