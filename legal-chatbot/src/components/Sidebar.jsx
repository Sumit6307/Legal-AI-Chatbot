import React from 'react';
import { auth } from '../firebase';

const Sidebar = ({ setActiveSection, user }) => {
  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Legal AI</h2>
      <button onClick={() => setActiveSection('home')} className="block p-2 hover:bg-gray-700">
        Home
      </button>
      <button onClick={() => setActiveSection('chat')} className="block p-2 hover:bg-gray-700">
        Chat
      </button>
      {user && (
        <>
          <button onClick={() => setActiveSection('cases')} className="block p-2 hover:bg-gray-700">
            Cases
          </button>
          <button onClick={() => setActiveSection('upload')} className="block p-2 hover:bg-gray-700">
            Upload
          </button>
          <button onClick={() => setActiveSection('profile')} className="block p-2 hover:bg-gray-700">
            Profile
          </button>
          <button
            onClick={() => setActiveSection('subscription')}
            className="block p-2 bg-green-500 hover:bg-green-600"
          >
            Subscribe
          </button>
          <button onClick={() => auth.signOut()} className="block p-2 hover:bg-gray-700">
            Sign Out
          </button>
        </>
      )}
      {!user && (
        <>
          <button
            onClick={() => auth.signInWithEmailAndPassword(prompt('Email:'), prompt('Password:'))}
            className="block p-2 hover:bg-gray-700"
          >
            Sign In
          </button>
          <button
            onClick={() => auth.createUserWithEmailAndPassword(prompt('Email:'), prompt('Password:'))}
            className="block p-2 hover:bg-gray-700"
          >
            Sign Up
          </button>
        </>
      )}
    </div>
  );
};

export default Sidebar;
