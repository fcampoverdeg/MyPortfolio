import React, { useState, useEffect, useRef } from "react";
import TypewriterEffect from "./TypewriterEffect";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import "./Home.css";

const Home = ({ loaded }) => {
  const [showContent, setShowContent] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const videoTimerRef = useRef(null);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const homeEndRef = useRef(null);
  const videoRef = useRef(null);

  // Only start animations AFTER preloader is done
  useEffect(() => {
    if (loaded) {
      // Small delay so the preloader split is fully open
      const timer = setTimeout(() => setShowContent(true), 200);
      return () => clearTimeout(timer);
    }
  }, [loaded]);

  // Parallax video on scroll
  useEffect(() => {
    if (window.innerWidth <= 768) return;
    const handleScroll = () => {
      if (videoRef.current) {
        const scrollY = window.scrollY;
        videoRef.current.style.transform = `translateY(${scrollY * 0.25}px) scale(1.1)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    if (window.innerWidth <= 768) {
      setButtonsVisible(true);
      return;
    }

    const target = homeEndRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => setButtonsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (target) observer.observe(target);
    return () => { if (target) observer.unobserve(target); };
  }, [isHome]);

  // Split title into characters for staggered animation
  const titleChars = "Felipe S. Campoverde".split("").map((char, i) => (
    <span
      key={i}
      className="title-char"
      style={{ "--char-index": i }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  return (
    <section id="home" className="home-container">
      {isHome && (
        <div
          className={`top-right-button-group ${
            buttonsVisible && showContent ? "buttons-animate-in" : ""
          }`}
        >
          <Link to="/portfolio" className="home-button">
            View Portfolio
          </Link>
          <div
            className="vt-news-trigger"
            onMouseEnter={() => {
              clearTimeout(videoTimerRef.current);
              setShowVideo(true);
            }}
            onMouseLeave={() => {
              videoTimerRef.current = setTimeout(() => setShowVideo(false), 400);
            }}
          >
            <span className="home-button">Featured in VT NEWS</span>
            {/* Invisible bridge so hover stays connected */}
            <div className="vt-hover-bridge" />
            <div className={`vt-video-popup ${showVideo ? "visible" : ""}`}>
              <iframe
                src={showVideo ? "https://www.youtube.com/embed/Fxc-An2Zm-w?autoplay=1&mute=1" : ""}
                title="VT News Feature"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Starfield background */}
      <div className="starfield">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              "--drift-x": `${(Math.random() - 0.5) * 30}px`,
              "--drift-y": `${(Math.random() - 0.5) * 30}px`,
            }}
          />
        ))}
      </div>

      <div className="home-content-wrapper">
        <video
          ref={videoRef}
          className={`background-video ${showContent ? "video-visible" : ""}`}
          autoPlay
          loop
          muted
          playsInline
          style={{ transform: "scale(1.1)" }}
        >
          <source src="/videos/home_background.mp4" type="video/mp4" />
        </video>

        <div className={`overlay ${showContent ? "overlay-visible" : ""}`}>
          <div className="home-content">
            <h1 className={`home-title ${showContent ? "title-animate" : ""}`}>
              {titleChars}
            </h1>
            <div className={`title-line ${showContent ? "line-animate" : ""}`} />
            {showContent && (
              <h2 className="home-subtitle">
                I'm a <TypewriterEffect />
              </h2>
            )}
          </div>
        </div>

        {isHome && showContent && (
          <div className="scroll-indicator">
            <div className="scroll-mouse">
              <div className="scroll-dot" />
            </div>
            <span>Scroll</span>
          </div>
        )}
      </div>

      <div ref={homeEndRef} className="home-end-anchor" />
    </section>
  );
};

export default Home;
