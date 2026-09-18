// utils/cartApi.js
import axios from 'axios';

export const fetchCartItems = async (userId) => {
  try {
    const response = await axios.get(`https://craft-bazaaar.onrender.com/cart/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching cart items:', error);
  }
};
