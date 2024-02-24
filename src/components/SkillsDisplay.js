import React, { useState } from 'react';
import Skill from './Skill';
import { useDarkMode } from '../DarkModeContext';

const skillsData = [
  { name: 'HTML', iconClass: 'devicon-html5-plain', duration: '6 Years' },
  { name: 'CSS3', iconClass: 'devicon-css3-plain', duration: '6 Years' },
  { name: 'JavaScript', iconClass: 'devicon-javascript-plain', duration: '6 Years' },
  { name: 'TypeScript', iconClass: 'devicon-typescript-plain', duration: '1 Year' },
  { name: 'Nodejs', iconClass: 'devicon-nodejs-plain', duration: '3 Years' },
  { name: 'MongoDB', iconClass: 'devicon-mongodb-plain', duration: '3 Years' },
  { name: 'React', iconClass: 'devicon-react-plain', duration: '6 Months' },
  { name: 'Vue', iconClass: 'devicon-vuejs-plain', duration: '6 Months' },
  { name: 'Python', iconClass: 'devicon-python-plain', duration: '5 Years' },
  { name: 'Java', iconClass: 'devicon-java-plain', duration: '3 Years' },
  { name: 'PHP', iconClass: 'devicon-php-plain', duration: '6 Months' },
  { name: 'Selenium', iconClass: 'devicon-selenium-plain', duration: '5 Years' },
  { name: 'Postman', iconClass: 'devicon-postman-plain', duration: '5 Years' },
  { name: 'Photoshop', iconClass: 'devicon-photoshop-plain', duration: '6 Years' },
];

function SkillsDisplay() {
  const { isDarkMode } = useDarkMode();
  const [ setSkillColor] = useState('');

  const handleColorExtraction = (color) => {
    setSkillColor(color);
  };

  return (
    <div>
      <h1>Skill Set</h1>
      <div className="Skills-container">
        {skillsData.map(skill => (
          <Skill
            key={skill.name}
            name={skill.name}
            iconClass={skill.iconClass}
            isDarkMode={isDarkMode}
            duration={skill.duration}
            onColorExtracted={handleColorExtraction}
          />              
        ))}
      </div>
    </div>
  );
}

export default SkillsDisplay;
