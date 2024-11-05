import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const UserPreferencesContext = createContext();

export const UserPreferencesProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize preferences from localStorage
  const [preferences, setPreferences] = useState(() => {
    const saved = localStorage.getItem('userPreferences');
    return saved ? JSON.parse(saved) : {
      lastVisitedPages: [], // Keep track of last 5 visited pages
      lastActivePage: '/analytics',
      sidebarExpanded: window.innerWidth >= 768,
      theme: 'light',
      // Add more preferences as needed
    };
  });

  // Update lastVisitedPages when location changes
  useEffect(() => {
    if (location.pathname === preferences.lastActivePage) return;

    setPreferences(prev => {
      const newPages = [
        location.pathname,
        ...prev.lastVisitedPages.filter(page => page !== location.pathname)
      ].slice(0, 5); // Keep only last 5 pages

      return {
        ...prev,
        lastVisitedPages: newPages,
        lastActivePage: location.pathname
      };
    });
  }, [location]);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
  }, [preferences]);

  // Restore last active page on initial load
  useEffect(() => {
    const savedPage = preferences.lastActivePage;
    if (savedPage && location.pathname === '/') {
      navigate(savedPage);
    }
  }, []);

  const updatePreference = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <UserPreferencesContext.Provider value={{ preferences, updatePreference }}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

export const useUserPreferences = () => useContext(UserPreferencesContext); 