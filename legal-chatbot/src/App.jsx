import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import Chat from './components/Chat.jsx';
import Sidebar from './components/Sidebar.jsx';
import CaseManager from './components/CaseManager.jsx';
import DocumentUpload from './components/DocumentUpload.jsx';
import Profile from './pages/Profile.jsx';
import Subscription from './pages/Subscription.jsx';
import Home from './pages/Home.jsx';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    auth.onAuthStateChanged(setUser);
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar setActiveSection={setActiveSection} user={user} />
      <div className="flex-1 p-4">
        {activeSection === 'home' && <Home user={user} />}
        {activeSection === 'chat' && <Chat user={user} />}
        {activeSection === 'cases' && <CaseManager user={user} />}
        {activeSection === 'upload' && <DocumentUpload user={user} />}
        {activeSection === 'profile' && <Profile user={user} />}
        {activeSection === 'subscription' && <Subscription user={user} />}
      </div>
    </div>
  );
};

export default App;
