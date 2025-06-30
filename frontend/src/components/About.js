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
            <p>
              I am a senior undergraduate majoring in Computer Science at
              Virginia Tech. Currently I serve as Chief and Software Engineer on
              the CroQuest team at VT CRO, the largest robotics organization on
              campus.
            </p>
            <p>
              My professional background includes working as a Software Engineer
              intern at the university developing a gaming console and teaching
              as a Cybersecurity Instructor to students.
            </p>
            <p>
              I enjoy learning new things, reading about technology, going for
              long drives, collecting cars, playing guitar, and taking care of
              my plant Benny.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
