import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CaseManager = ({ user }) => {
  const [cases, setCases] = useState([]);
  const [caseName, setCaseName] = useState('');

  useEffect(() => {
    if (user) {
      fetchCases();
    }
  }, [user]);

  const fetchCases = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/case/${user.uid}`);
      setCases(response.data);
    } catch (error) {
      console.error('Error fetching cases:', error);
    }
  };

  const handleCreateCase = async () => {
    if (!caseName.trim()) return;
    try {
      await axios.post('http://localhost:5000/api/case', {
        uid: user.uid,
        name: caseName,
        status: 'Open',
      });
      setCaseName('');
      fetchCases();
    } catch (error) {
      console.error('Error creating case:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Case Management</h2>
      <div className="mb-4">
        <input
          type="text"
          value={caseName}
          onChange={(e) => setCaseName(e.target.value)}
          className="p-2 border rounded"
          placeholder="Enter case name"
        />
        <button onClick={handleCreateCase} className="p-2 bg-blue-500 text-white rounded ml-2">
          Create Case
        </button>
      </div>
      <ul>
        {cases.map((c, index) => (
          <li key={index} className="p-2 border-b">
            {c.name} - {c.status} (Created: {new Date(c.createdAt).toLocaleDateString()})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CaseManager;
