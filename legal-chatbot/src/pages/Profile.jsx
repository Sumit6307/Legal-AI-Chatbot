import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../firebase';

const Profile = ({ user }) => {
  const [profile, setProfile] = useState({ name: '', email: '' });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/auth/profile/${user.uid}`);
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/auth/profile/${user.uid}`, {
        name: profile.name,
        email: profile.email,
      });
      alert('Profile updated!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="mb-4">
        <label className="block mb-1">Name</label>
        <input
          type="text"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          className="p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <input
          type="email"
          value={profile.email}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          className="p-2 border rounded w-full"
        />
      </div>
      <button onClick={handleUpdate} className="p-2 bg-blue-500 text-white rounded">
        Update Profile
      </button>
    </div>
  );
};

export default Profile;
