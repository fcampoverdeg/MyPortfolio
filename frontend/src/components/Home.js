import React, { useState, useEffect, useRef } from "react";
import TypewriterEffect from "./TypewriterEffect";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import "./Home.css";

const Home = () => {
  const [mounted, setMounted] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(true);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const homeEndRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isHome) return;

    // On mobile, always show buttons
    if (window.innerWidth <= 768) {
      setButtonsVisible(true);
      return;
    }

    const target = homeEndRef.current; // ← Fix: copy ref to a local variable

    const observer = new IntersectionObserver(
      ([entry]) => {
        setButtonsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target); // ← Use same local reference
    };
  }, [isHome]);

  return (
    <section id="home" className="home-container">
      {/* Top-right buttons */}
      {isHome && (
        <div
          className={`top-right-button-group ${
            buttonsVisible ? "buttons-animate-in" : ""
          }`}
        >
          <div className="vt-news-slide-container">
            <div className="home-button vt-news-hover-trigger">
              Featured in VT NEWS
            </div>
            <div className="vt-news-video-slide">
              <iframe
                src="https://www.youtube.com/embed/Fxc-An2Zm-w?autoplay=1&mute=1"
                title="VT News Feature"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <Link to="/portfolio" className="home-button">
            View Portfolio
          </Link>
        </div>
      )}

      {/* Main title */}
      <div className={`home-content-wrapper ${mounted ? "fancy-fade-in" : ""}`}>
        <div className="overlay">
          <div className="home-content">
            <h1 className="home-title">Felipe S. Campoverde</h1>
            {mounted && (
              <h2 className="home-subtitle">
                I’m a <TypewriterEffect />
              </h2>
            )}
          </div>
        </div>
      </div>

      {/* Invisible anchor to detect end of Home section */}
      <div ref={homeEndRef} className="home-end-anchor" />
    </section>
  );
};

export default Home;
