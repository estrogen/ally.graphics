import React, { createContext, useContext, useState } from 'react';

const DarkModeContext = createContext();

export const useDarkMode = () => useContext(DarkModeContext);

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('isDarkMode');
    return savedMode ? savedMode === 'true' : false;
  });

  const setMode = (mode) => {
    localStorage.setItem('isDarkMode', mode);
    setIsDarkMode(mode);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, setMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};