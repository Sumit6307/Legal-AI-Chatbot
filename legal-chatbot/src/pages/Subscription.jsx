import React, { useState } from 'react';
import axios from 'axios';

const Subscription = ({ user }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/payment/create-order', {
        uid: user.uid,
      });
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: response.data.amount,
        currency: response.data.currency,
        order_id: response.data.order_id,
        handler: async (response) => {
          await axios.post('http://localhost:5000/api/payment/verify', {
            uid: user.uid,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });
          setIsSubscribed(true);
          alert('Subscription successful!');
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error initiating subscription:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Subscription</h2>
      {isSubscribed ? (
        <p className="text-green-500">You are subscribed! Enjoy unlimited prompts.</p>
      ) : (
        <>
          <p>Subscribe for unlimited prompts and premium features.</p>
          <button onClick={handleSubscribe} className="p-2 bg-green-500 text-white rounded mt-4">
            Subscribe Now
          </button>
        </>
      )}
    </div>
  );
};

export default Subscription;
