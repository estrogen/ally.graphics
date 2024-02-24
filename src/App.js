import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import { useDarkMode, DarkModeProvider } from './DarkModeContext';
import Toggle from './components/Toggle';
import SkillsDisplay from './components/SkillsDisplay';
import ProjectsDisplay from './components/ProjectsDisplay';

/* Assets */
import Avatar from './assets/pfp.png';

/* Preloading BG */
import DayImage1 from './assets/day/1.png';
import DayImage2 from './assets/day/2.png';
import DayImage3 from './assets/day/3.png';
import DayImage4 from './assets/day/4.png';
import NightImage1 from './assets/night/1.png';
import NightImage2 from './assets/night/2.png';
import NightImage3 from './assets/night/3.png';
import NightImage4 from './assets/night/4.png';

function wrapCharsInSpans(text, baseClass = 'light') {
  return text.split('').map((char, index) => (
    <span key={index} className={baseClass}>
      {char}
    </span>
  ));
}

function AppContent() {
  const { isDarkMode, setMode } = useDarkMode();
  const [isTransitioning, setIsTransitioning] = useState(false);
  /*const [scrollThumbHeight, setScrollThumbHeight] = useState('0%');
  const [scrollThumbTop, setScrollThumbTop] = useState('0%');
  const headerHeight = 83;*/
  const navRef = useRef(null);
  const backgroundRef = useRef(null);

  const sectionsRefs = {
    home: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    contact: useRef(null),
  };

  

  const handleToggle = () => {
    setIsTransitioning(true);
    setMode(!isDarkMode);
  };  

  const handleNavClick = (e, sectionRef) => {
    e.preventDefault();
    scrollToSection(sectionRef);
  };

  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const adjustNavFontWeight = () => {
    const scrollPosition = window.scrollY;
    const totalScrollHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercentage = scrollPosition / totalScrollHeight;
  
    const navWidth = navRef.current.offsetWidth;
    const affectedWidth = navWidth * 0.25;
    const affectedStart = scrollPercentage * (navWidth - affectedWidth);
  
    const gradientParts = 6;
    const partWidth = affectedWidth / gradientParts;
  
    document.querySelectorAll('.App-nav a').forEach(link => {
      const spans = link.querySelectorAll('span');
      spans.forEach(span => {
        const spanOffset = span.offsetLeft - navRef.current.offsetLeft;

        span.className = 'regular';
  
        const positionWithinAffected = spanOffset - affectedStart;
        if (positionWithinAffected >= 0 && positionWithinAffected <= affectedWidth) {
          if (positionWithinAffected < partWidth || positionWithinAffected > partWidth * 5) {
            span.className = 'regular';
          } else if ((positionWithinAffected >= partWidth && positionWithinAffected < partWidth * 2) || (positionWithinAffected > partWidth * 4 && positionWithinAffected <= partWidth * 5)) {
            span.className = 'medium';
          } else if (positionWithinAffected >= partWidth * 2 && positionWithinAffected <= partWidth * 4) {
            span.className = 'black';
          }
        }
      });
    });
  };
  
  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const width = window.innerWidth
    const height = window.innerHeight;
  
    const layers = backgroundRef.current.querySelectorAll('.BG-layer');
    const depth = parseFloat(layers[3].getAttribute('data-depth'));
    const moveX = (clientX - width / 2) * depth;
    const moveY = (clientY - height / 2) * depth;

    backgroundRef.current.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(1.5)`;

    layers.forEach((layer, index) => {
      const layerDepth = parseFloat(layer.getAttribute('data-depth'));
      const layerMoveX = (clientX - width / 2) * layerDepth;
      const layerMoveY = (clientY - height / 2) * layerDepth;

      layer.style.transform = `translate3d(${layerMoveX}px, ${layerMoveY}px, 0)`;
    });
  };

  /* SCRAPPED IDEA
  useEffect(() => {
    const handleScroll = () => {
      const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      const scrollProgress = currentScroll / totalScrollHeight;

      const thumbHeight = Math.max((window.innerHeight / document.documentElement.scrollHeight) * 100, 10);

      let thumbTop = scrollProgress * (100 - thumbHeight);

      if (thumbTop + thumbHeight > 100 - 2) {
        thumbTop = 100 - thumbHeight - 2;
        setScrollThumbHeight(`${thumbHeight * 0.8}%`);
      } else {
        setScrollThumbHeight(`${thumbHeight}%`);
      }

      setScrollThumbTop(`${thumbTop}%`);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);*/

  useEffect(() => {  /* Handles Dark mode setting saved in LS */
    const savedMode = localStorage.getItem('isDarkMode');
    if (savedMode !== null) {
      setMode(savedMode === 'true');
    }
  }, [setMode]);
  

  useEffect(() => { /* Handles Dark mode toggling */
    document.body.classList.toggle('Dark-mode', isDarkMode);
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isDarkMode, isTransitioning]);
    
  useEffect(() => { /* Handles Horizontal Font Weight Effect */
    adjustNavFontWeight();
    window.addEventListener('scroll', adjustNavFontWeight);
  
    return () => {
      window.removeEventListener('scroll', adjustNavFontWeight);
    };
  }, []);

  useEffect(() => { /* Handles Element Popups */
    const queue = [];
    let isProcessingQueue = false;
  
    const processQueue = () => {
      if (queue.length === 0) {
        isProcessingQueue = false;
        return;
      }
      isProcessingQueue = true;
      const element = queue.shift();
      element.classList.add('Show');
  
      setTimeout(() => {
        processQueue();
      }, 25);
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          queue.push(entry.target);
  
          if (!isProcessingQueue) {
            processQueue();
          }
        }
      });
    }, { threshold: 0.1 });
  
    const hiddenElements = document.querySelectorAll('.Hidden');
    hiddenElements.forEach((el) => observer.observe(el));
  
    return () => observer.disconnect();
  }, []);

  useEffect(() => { /* Handles Parallax Effect */
    document.body.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.body.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Toggle onClick={handleToggle}/>
        <nav ref={navRef}>
          <ul className="App-nav">
            <li><a href="#home" onClick={(e) => handleNavClick(e, sectionsRefs.home)}>{wrapCharsInSpans("Home", "regular")}</a></li>
            <li><a href="#skills" onClick={(e) => handleNavClick(e, sectionsRefs.skills)}>{wrapCharsInSpans("Skills", "regular")}</a></li>
            <li><a href="#projects" onClick={(e) => handleNavClick(e, sectionsRefs.projects)}>{wrapCharsInSpans("Projects", "regular")}</a></li>
            <li><a href="#contact" onClick={(e) => handleNavClick(e, sectionsRefs.contact)}>{wrapCharsInSpans("Contact", "regular")}</a></li>
          </ul>
        </nav>
      </header>
      {/*<div className="custom-scrollbar">
        <div
          className="scrollbar-thumb"
          style={{ height: scrollThumbHeight, top: scrollThumbTop }}
        ></div>
      </div>*/}
      <div className="content">
        <div className="Section-container" ref={sectionsRefs.home}>
          <div className={`BG-wrapper ${isDarkMode ? 'Dark-mode' : ''}`} ref={backgroundRef}>
            <div className="BG-layer" data-depth="0.01">
              <div className={`Day-image ${isDarkMode ? 'Fade-out' : 'Fade-in'}`} style={{ backgroundImage: `url(${DayImage1})` }}></div>
              <div className={`Night-image ${isDarkMode ? 'Fade-in' : 'Fade-out'}`} style={{ backgroundImage: `url(${NightImage1})` }}></div>
            </div>
            <div className="BG-layer" data-depth="0.03">
              <div className={`Day-image ${isDarkMode ? 'Fade-out' : 'Fade-in'}`} style={{ backgroundImage: `url(${DayImage2})` }}></div>
              <div className={`Night-image ${isDarkMode ? 'Fade-in' : 'Fade-out'}`} style={{ backgroundImage: `url(${NightImage2})` }}></div>
            </div>
            <div className="BG-layer" data-depth="0.05">
              <div className={`Day-image ${isDarkMode ? 'Fade-out' : 'Fade-in'}`} style={{ backgroundImage: `url(${DayImage3})` }}></div>
              <div className={`Night-image ${isDarkMode ? 'Fade-in' : 'Fade-out'}`} style={{ backgroundImage: `url(${NightImage3})` }}></div>
            </div>
            <div className="BG-layer" data-depth="0.07">
              <div className={`Day-image ${isDarkMode ? 'Fade-out' : 'Fade-in'}`} style={{ backgroundImage: `url(${DayImage4})` }}></div>
              <div className={`Night-image ${isDarkMode ? 'Fade-in' : 'Fade-out'}`} style={{ backgroundImage: `url(${NightImage4})` }}></div>
            </div>
          </div>
          
          <section id="home" className="section">
            <div className="Center-avatar">
              <div className="App-avatar">
                <img src={Avatar} alt="Avatar" />
              </div>
            </div>
            <h1 className="light home Hidden">
              <span className="medium">Hello, I'm Ally</span>, a developer with a strong background in <span className="medium">NodeJS and front-end development. </span>
               Currently expanding my skill set by diving into <span className="medium">C++, Vue.js, and React.js.</span>
            </h1>
          </section>
          <div className="Vertical-line"></div>
        </div>
        <div className="Section-container" ref={sectionsRefs.skills}>
          <section id="skills" className="section">
            <SkillsDisplay/>
          </section>
          <div className="Vertical-line"></div>
        </div>
        <div className="Section-container" ref={sectionsRefs.projects}>
          <section id="projects" className="section">
            <ProjectsDisplay/>
          </section>
          <div className="Vertical-line"></div>
        </div>
        <div className="Section-container" ref={sectionsRefs.contact}>
          <section id="contact" className="section">
            <h2 className="Hidden">⚠ Under Construction ⚠</h2>
          </section>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <DarkModeProvider>
      <AppContent/>
    </DarkModeProvider>
  );
}

export default App;
