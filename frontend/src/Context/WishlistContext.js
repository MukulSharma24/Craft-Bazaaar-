// WishlistContext.js — client-side wishlist backed by localStorage.
// Stores full product objects so the wishlist page can render without refetching.
import React, { createContext, useReducer, useContext, useEffect } from 'react';

const WishlistContext = createContext();

const STORAGE_KEY = 'ds_wishlist';

const loadInitial = () => {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    // ignore any legacy entries that were stored as bare ids (strings)
    return data.filter((item) => item && typeof item === 'object' && item._id);
  } catch {
    return [];
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE': {
      const product = action.payload;
      return state.some((item) => item._id === product._id)
        ? state.filter((item) => item._id !== product._id)
        : [...state, product];
    }
    case 'REMOVE':
      return state.filter((item) => item._id !== action.payload);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, dispatch] = useReducer(reducer, [], loadInitial);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => dispatch({ type: 'TOGGLE', payload: product });
  const removeFromWishlist = (id) => dispatch({ type: 'REMOVE', payload: id });
  const clearWishlist = () => dispatch({ type: 'CLEAR' });
  const isWishlisted = (id) => wishlist.some((item) => item._id === id);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
        isWishlisted,
        wishlistCount: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);

export default WishlistContext;
