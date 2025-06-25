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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="about" className="about-container" ref={sectionRef}>
      <div className={`about-inner ${isVisible ? "animate" : ""}`}>
        <div className="about-image">
          <img src={profileImg} alt="Felipe S. Campoverde" />
        </div>
        <div className="about-text">
          <h2 className="about-title">About Me</h2>
          <div className="about-description">
            <p>Welcome!</p>
            <p>
              Currently, I am a Senior at{" "}
              <span className="highlight">Virginia Tech</span> — a curious mind,
              relentless builder, and visionary technologists.
            </p>
            <p>
              Driven by a passion for learning and a purpose to create, I turn
              ideas into reality through embedded systems, full-stack
              applications, and immersive interfaces. My commitment lies on{" "}
              <span className="highlight">Determination</span>,
              <span className="highlight"> Growth</span>, and
              <span className="highlight"> Progress</span>.
            </p>
            <p className="about-vision">
              "I code, not just to solve problems, but to shape experiences that{" "}
              <strong>resonate</strong>, <strong>empower</strong>, and{" "}
              <strong>move</strong> people forward."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
