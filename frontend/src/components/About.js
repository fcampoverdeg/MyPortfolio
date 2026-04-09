import React, { useEffect, useRef, useState } from "react";

import "./About.css";
import profileImg from "../images/profile.png";

const About = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section className="about-container" ref={sectionRef}>
      <div className={`about-inner ${isVisible ? "animate" : ""}`}>
        <div className="about-image" style={{ "--reveal-delay": "0s" }}>
          <img src={profileImg} alt="Felipe S. Campoverde" />
        </div>
        <div className="about-text">
          <h2 className="about-title" style={{ "--reveal-delay": "0.15s" }}>
            About
          </h2>
          <div className="about-description">
            <p style={{ "--reveal-delay": "0.25s" }}>
              Robotics Lead Software Engineer at Daily's and CS student at
              Virginia Tech. I build things that bridge hardware and software — from
              robotic systems and ESP32 game consoles to autonomous vehicles and
              full-stack web apps.
            </p>
            <p style={{ "--reveal-delay": "0.35s" }}>
              Arch Linux daily driver since 2019. When I'm not coding, I'm on
              long drives, playing guitar, or debugging why my plant Benny won't
              grow.
            </p>
          </div>
          <p className="impact-line" style={{ "--reveal-delay": "0.45s" }}>
            Currently leading robotics at Dailys.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
