import React, { createContext, useContext, useState, useEffect } from 'react';

const VegModeContext = createContext();

export const VegModeProvider = ({ children }) => {
  const [isVegMode, setIsVegMode] = useState(() => {
    const saved = localStorage.getItem('vegMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('vegMode', JSON.stringify(isVegMode));
  }, [isVegMode]);

  return (
    <VegModeContext.Provider value={{ isVegMode, setIsVegMode }}>
      {children}
    </VegModeContext.Provider>
  );
};

export const useVegMode = () => useContext(VegModeContext); 