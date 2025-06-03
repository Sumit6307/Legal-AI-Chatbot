import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../firebase';

const Chat = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [promptCount, setPromptCount] = useState(0);
  const [isTempChat, setIsTempChat] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    if (user) {
           checkSubscription();
    }
  }, [user]);

  const fetchChatHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/chat/${user.uid}`);
      setChatHistory(response.data);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const checkSubscription = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/payment/subscription/${user.uid}`);
      setIsSubscribed(response.data.isSubscribed);
    } catch (error) {
      console.error('Error checking subscription:', error);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    if (!user && promptCount >= 6) {
      alert('Sign in to continue.');
      return;
    }
    if (user && !isSubscribed && promptCount >= 100) {
      alert('Upgrade to a subscription for unlimited prompts.');
      return;
    }

    const newMessage = { role: 'user', content: input };
    setMessages([...messages, newMessage]);
    setPromptCount(promptCount + 1);

    try {
      const response = await axios.post('http://localhost:5000/api/chat', {
        message: input,
        isLegalQuery: true,
      });
      const aiMessage = { role: 'assistant', content: response.data.response };
      setMessages([...messages, newMessage, aiMessage]);

      if (!isTempChat && user) {
        await axios.post('http://localhost:5000/api/chat/save', {
          uid: user.uid,
          message: newMessage,
        });
        await axios.post('http://localhost:5000/api/chat/save', {
          uid: user.uid,
          message: aiMessage,
        });
        fetchChatHistory();
      }
    } catch (error) {
      console.error('Error processing request:', error);
    }

    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Legal AI Chat</h2>
      {user && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Chat History</h3>
          <ul className="max-h-40 overflow-y-auto">
            {chatHistory.map((chat, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => setMessages(chat.messages)}
              >
                {chat.messages[0]?.content.substring(0, 30)}...
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex-1 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 m-2 rounded ${msg.role === 'user' ? 'bg-blue-200 ml-auto' : 'bg-green-200'}`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Ask a legal question..."
        />
        <button onClick={handleSend} className="p-2 bg-blue-500 text-white rounded">
          Send
        </button>
        <button
          onClick={() => setIsTempChat(!isTempChat)}
          className="p-2 bg-gray-500 text-white rounded ml-2"
        >
          {isTempChat ? 'Save Chats' : 'Temp Chat'}
        </button>
      </div>
    </div>
  );
};

export default Chat;
