import React, { useEffect, useRef, useState, useMemo } from "react";

import "./About.css";
import profileImg from "../images/profile.png";

const TEXTS = [
  "Robotics software engineer and CS student at Virginia Tech. I build things that bridge hardware and software, from robotic manipulation and ESP32 game consoles to autonomous vehicles and full-stack web apps.",
  "Arch Linux daily driver since 2019. When I'm not coding, I'm on long drives, playing guitar, or debugging why my plant Benny won't grow.",
  "Currently building robots that learn from demonstration.",
];

const SPEED = 25; // ms per character
const START_DELAY = 600; // ms before typing begins
const PAUSE_BETWEEN = 400; // ms pause between paragraphs

const About = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [typed, setTyped] = useState([]); // array of char counts per block
  const [activeBlock, setActiveBlock] = useState(-1);
  const timerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  // Sequential typing engine — runs once when visible
  useEffect(() => {
    if (!isVisible) return;

    const counts = TEXTS.map(() => 0);
    setTyped([...counts]);

    const typeBlock = (blockIdx) => {
      if (blockIdx >= TEXTS.length) {
        setActiveBlock(-1); // done, hide cursor
        return;
      }

      setActiveBlock(blockIdx);
      let i = 0;
      const len = TEXTS[blockIdx].length;

      timerRef.current = setInterval(() => {
        i++;
        counts[blockIdx] = i;
        setTyped([...counts]);
        if (i >= len) {
          clearInterval(timerRef.current);
          // Pause then start next block
          timerRef.current = setTimeout(() => typeBlock(blockIdx + 1), PAUSE_BETWEEN);
        }
      }, SPEED);
    };

    const startTimer = setTimeout(() => typeBlock(0), START_DELAY);
    return () => {
      clearTimeout(startTimer);
      clearInterval(timerRef.current);
      clearTimeout(timerRef.current);
    };
  }, [isVisible]);

  // Pre-calculate final card dimensions by rendering invisible full text
  const displayTexts = useMemo(() =>
    TEXTS.map((text, i) => {
      const chars = typed[i] || 0;
      return chars > 0 ? text.slice(0, chars) : "";
    }),
  [typed]);

  return (
    <section id="about" className="about-container" ref={sectionRef}>
      <div className={`about-inner ${isVisible ? "animate" : ""}`}>
        <div className="about-image" style={{ "--reveal-delay": "0s" }}>
          <img src={profileImg} alt="Felipe S. Campoverde" />
        </div>
        <div className="about-text">
          <h2 className="about-title" style={{ "--reveal-delay": "0.15s" }}>
            About
          </h2>
          <div className="about-description">
            {TEXTS.slice(0, 2).map((fullText, i) => (
              <p key={i} style={{ "--reveal-delay": "0.25s" }}>
                {/* Invisible full text to hold the size */}
                <span className="typed-sizer">{fullText}</span>
                {/* Visible typed text */}
                <span className="typed-overlay">
                  {displayTexts[i]}
                  {activeBlock === i && <span className="typed-cursor">|</span>}
                </span>
              </p>
            ))}
          </div>
          <p className={`impact-line ${activeBlock >= 2 ? "impact-active" : ""}`} style={{ "--reveal-delay": "0.25s" }}>
            <span className="typed-sizer">{TEXTS[2]}</span>
            <span className="typed-overlay">
              {displayTexts[2]}
              {activeBlock === 2 && <span className="typed-cursor">|</span>}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
