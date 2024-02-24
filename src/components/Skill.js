import React, { useEffect, useRef, useState } from 'react';

const overrides = {
    "photoshop": "rgba(49, 168, 255, 1)",
};

function Skill({ name, iconClass, isDarkMode, duration }) {
    const iconRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [style, setStyle] = useState({});
    const [iconStyle, setIconStyle] = useState({});

    useEffect(() => {
        if (isDarkMode && iconRef.current) {
            if (overrides[name.toLowerCase()]) {
                setIconStyle({ color: overrides[name.toLowerCase()] });
            }
            setTimeout(() => {
                let borderColor, boxShadowColor;
            
                if (overrides[name.toLowerCase()]) {
                    const overrideColor = overrides[name.toLowerCase()];
                    const rgbaMatch = overrideColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.?\d*))?\)/);
                    if (rgbaMatch) {
                        borderColor = boxShadowColor = `rgba(${rgbaMatch[1]}, ${rgbaMatch[2]}, ${rgbaMatch[3]}, 0.5)`;
                    }
                } else {
                    const computedColor = window.getComputedStyle(iconRef.current).color;
                    const rgbMatch = computedColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
                    if (rgbMatch) {
                        borderColor = boxShadowColor = `rgba(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}, 0.5)`;
                    }
                }
            
                setStyle({
                    borderColor: borderColor,
                    boxShadow: `0 0 0.4rem ${boxShadowColor}`
                });
            
            }, 1000);
        } else {
            setStyle({});
            setIconStyle({});
        }
    }, [isDarkMode, name]);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const iconClassName = overrides[name.toLowerCase()] ? iconClass : `${iconClass} ${isDarkMode ? 'colored' : ''}`;

    return (
        <button className="Skill Hidden" style={style} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="Skill-content">
                <i ref={iconRef} className={iconClassName} style={iconStyle}></i>
                <span>{name}</span>
            </div>
            <div className="Skill-duration">
                {duration}
            </div>
        </button>
    );
}

export default Skill;
