import React from 'react';
import { useDarkMode } from '../DarkModeContext';
import './Toggle.css';
import toggleImage from '../assets/day-and-night.png';

function Toggle() {
  const { isDarkMode, setMode } = useDarkMode();

  const handleClick = () => {
    setMode(!isDarkMode);
  };

  return (
      <div className={`toggle-container ${isDarkMode ? 'dark' : ''}`} onClick={handleClick}> 
        <img src={toggleImage} alt="Toggle" className="toggle-image" />
      </div>
  );
}


export default Toggle;