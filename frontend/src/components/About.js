import React, { useEffect, useRef, useState } from "react";

import "./About.css";
import profileImg from "../images/profile.jpg";

const About = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // Only trigger once
          }
        });
      },
      { threshold: 0.6 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section className="about-container" ref={sectionRef}>
      <div className={`about-inner ${isVisible ? "animate" : ""}`}>
        <div className="about-image">
          <img src={profileImg} alt="Felipe S. Campoverde" />
        </div>
        <div className="about-text">
          <h2 className="about-title">About</h2>
          <div className="about-description">
            <p>Welcome!</p>
            <p>
              Currently, I am a Senior at{" "}
              <span className="highlight">Virginia Tech</span> — a curious mind,
              relentless builder, and visionary technologist.
            </p>
            <p>
              Driven by a passion for learning and a purpose to create, I turn
              ideas into reality through embedded systems, full-stack
              applications, and immersive interfaces. My commitment lies in{" "}
              <span className="highlight">Determination</span>,
              <span className="highlight"> Growth</span>, and
              <span className="highlight"> Progress</span>.
            </p>
            <p className="about-vision">
              <strong>
                "I code, not just to solve problems, but to shape experiences
                that resonate, empower, and move people forward."
              </strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
