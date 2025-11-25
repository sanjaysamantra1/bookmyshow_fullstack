import React, { createContext, useContext, useState, useEffect } from 'react';
import { getProfile } from '../utils/apiClient.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('bms_token') || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      if (token) {
        try {
          const profile = await getProfile(token);
          setUser(profile);
        } catch {
          setToken('');
          localStorage.removeItem('bms_token');
        }
      }
      setLoading(false);
    };
    init();
  }, [token]);

  const login = (jwt, userObj) => {
    setToken(jwt);
    localStorage.setItem('bms_token', jwt);
    setUser(userObj);
  };

  const logout = () => {
    setToken('');
    localStorage.removeItem('bms_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
