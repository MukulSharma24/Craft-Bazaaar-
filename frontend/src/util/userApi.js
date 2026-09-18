// utils/userApi.js
import axios from 'axios';

export const fetchUser = async (userId) => {
  try {
    const response = await axios.get(`/users/${userId}`);
    return response.data; // Assuming the API returns user details as an object
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error; // Re-throw the error for handling in the calling component
  }
};
