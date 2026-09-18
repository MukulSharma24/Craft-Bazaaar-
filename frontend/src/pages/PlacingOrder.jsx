import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const PlacingOrder = () => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();
  const {id: productId} = useParams(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Debugging: Log the productId
    console.log("Product ID:", productId);
    console.log("Sending order data:", { productId, phone, email, address });

    try {
      const response = await axios.post('http://localhost:3389/order', {
        productId,  // Ensure this is correctly sent
        phone,
        email,
        address,
      });

      if (response.status === 201) {
        console.log("Order created:", response.data);
        const orderId = response.data._id;
        navigate(`/product-summary/${orderId}`);
      } else {
        console.error('Failed to place order', response);
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <textarea
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button type="submit">Place Order</button>
    </form>
  );
};

export default PlacingOrder;
