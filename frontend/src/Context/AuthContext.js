// AuthContext.js — tracks the logged-in user (persisted in localStorage).
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const KEY = 'ds_user';

const loadInitial = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(loadInitial);

  const login = (u) => {
    setUser(u);
    localStorage.setItem(KEY, JSON.stringify(u));
    localStorage.setItem('userId', u.email || '');
    localStorage.setItem('userName', u.name || '');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(KEY);
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
