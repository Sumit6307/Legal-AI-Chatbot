import React from 'react';

const Home = ({ user }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Welcome to Legal AI Chatbot</h2>
      <p>Ask legal questions, manage cases, and analyze documents with ease.</p>
      {!user && (
        <p className="mt-4">
          Sign in to access full features, including chat history and case management.
        </p>
      )}
    </div>
  );
};

export default Home;
