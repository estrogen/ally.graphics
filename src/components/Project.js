import React from 'react';

function Project({ name, timeFrame, thumbnail, miniDesc, tags, button, isDarkMode }) {
  return (
    <button className="Project Hidden">
      <div className={`Project-thumbnail ${isDarkMode ? 'Dark-mode' : ''}`}>
        <img src={thumbnail} alt={name} />
      </div>
      <div className="Description">
        <h2>{name}<span className="light">{timeFrame}</span></h2>
        <span className="Mini regular">{miniDesc}</span>
        <div className="Tags">
          {tags.map(tag => (
            <span key={tag} className="Hidden Tag light">{tag}</span>
          ))}
        </div>
        <button 
          className="Hidden Visit-button" 
          onClick={() => window.location.href = button.href} 
          disabled={button.disabled}>
          {button.value}
        </button>
      </div>
    </button>
  );
}

export default Project;
