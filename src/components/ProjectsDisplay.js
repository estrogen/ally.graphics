import React from 'react';
import Project from './Project';
import { useDarkMode } from '../DarkModeContext';
import Luna from '../assets/luna.png';
import Addons from '../assets/mining.png';
import Maple from '../assets/gm.png';

const projectsData = [
  {
    name: "Luna",
    timeFrame: "Apr 2020 - Present",
    thumbnail: Luna,
    miniDesc: "Versatile tool designed for comprehensive community management, supporting over 150,000+ users.",
    tags: ["NodeJS", "MongoDB", "Docker"],
    button: {
      value: "Visit Project",
      href: "https://github.com/estrogen/LunaBot.js",
      disabled: false,
    }
  },
  {
    name: "Farming & Mining Bot",
    timeFrame: "Jan 2022 - Present",
    thumbnail: Addons,
    miniDesc: "Java mod for Minecraft which allows recording and mimicking human actions for undetectable mining and farming.",
    tags: ["Java", "Private"],
    button: {
      value: "Preview Bot",
      href: "https://youtu.be/3KpYR1YcP2A",
      disabled: false,
    }
  },
  {
    name: "Maplestory AI Bot",
    timeFrame: "Feb 2021 - Jan 2023",
    thumbnail: Maple,
    miniDesc: "Developed a Python bot with OpenAI to automate gaming, effectively passing the Turing test by bypassing anti-bot measures.",
    tags: ["Python", "OpenAI", "Private"],
    button: {
      value: "Preview Bot",
      href: "https://youtu.be/XPtWXwMGdzo",
      disabled: false,
    }
  }
];

function ProjectsDisplay() {
  const { isDarkMode } = useDarkMode();

  return (
    <div>
      <h1>Projects</h1>
      <div>
        {projectsData.map(project => (
          <Project
            key={project.name}
            name={project.name}
            timeFrame={project.timeFrame}
            thumbnail={project.thumbnail}
            miniDesc={project.miniDesc}
            tags={project.tags}
            button={project.button}
            isDarkMode={isDarkMode}
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectsDisplay;
