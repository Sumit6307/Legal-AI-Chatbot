import React, { useState } from 'react';
import axios from 'axios';

const DocumentUpload = ({ user }) => {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('uid', user.uid);

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData);
      setAnalysis(response.data.analysis);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Document Upload</h2>
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <button onClick={handleUpload} className="p-2 bg-blue-500 text-white rounded">
        Upload & Analyze
      </button>
      {analysis && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="text-lg font-semibold">Analysis Result</h3>
          <p>{analysis}</p>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
