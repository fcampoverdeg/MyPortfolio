// src/components/Portfolio.js
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import Footer from "./Footer";
import "./Portfolio.css";

// Define your project data array
const projects = [
  {
    title: "CroQuest (Game Console)",
    image: "/images/CroQuest/CroQuest_Cover.png",
    description:
      "A fully custom ESP32-based handheld console featuring 8 original games, Bluetooth multiplayer, sound effects, SD card asset loading, and a retro-inspired UI designed for children.",
    tags: [
      "C++",
      "PlatformIO",
      "Embedded",
      "ESP32",
      "Bluetooth (BLE)",
      "Graphics",
    ],
    github: "https://github.com/VT-CRO/CroQuest",
    website: "https://morganw040.wixsite.com/croquest",
    video: "https://www.youtube.com/watch?v=Fxc-An2Zm-w",
    organization: "https://www.vtcro.org/design-teams/qst",
    path: "/projects/CroQuest",
    reverse: true,
  },
  {
    title: "My Portfolio (Current Website)",
    image: "/images/general/Logo.png",
    description:
      "A full-stack personal portfolio built with React and Express, featuring an interactive data dashboard with animated chart brushing, MongoDB storage, and mobile-friendly UI transitions.",
    tags: [
      "React",
      "JavaScript",
      "MongoDB",
      "Zustand",
      "Express",
      "MUI",
      "HTML",
      "CSS",
    ],
    github: "https://github.com/fcampoverdeg/MyPortfolio",
    // demo: "/projects/dashboard",
    path: "/projects/MyPortfolio",
    reverse: true,
  },
  {
    title: "Autonomous Car (Temporarily Unavailable)",
    image: "/images/car/NCB.jpg",
    description:
      "Engineered a fully autonomous vehicle using ROS2 and Gazebo to navigate obstacle courses for the National Robotics Challenge, including real-time mapping, path planning, and simulation.",
    tags: ["C++", "ROS", "Gazebo", "RVIZ", "Nav2", "Linux"],
    github: "https://github.com/VT-CRO/NationalRoboticsChallengeCode",
    // demo: "/projects/dashboard",
    organization: "https://www.vtcro.org/design-teams/dog",
    path: "/projects/AutonomousCar",
    reverse: true,
  },
];

const Portfolio = () => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;

    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "auto" }); // <- changed to "auto"
        }
      }, 0); // optional: keep small delay if needed for DOM paint
    } else {
      window.scrollTo({ top: 0, behavior: "auto" }); // <- instant top
    }
  }, [location]);

  // Animated Background
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );

    const target = containerRef.current;

    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);

  // Transitions for Project Cards
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.3 }
    );

    reveals.forEach((el) => observer.observe(el));

    return () => {
      reveals.forEach((el) => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    // Restore smooth scrolling once page has loaded
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div id="portfolio-top" className="portfolio-page">
      {/* Particle Background */}
      <div className="background-particles">
        {[...Array(20)].map((_, i) => (
          <div
            className="particle"
            key={i}
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 100}vh`,
              left: `${Math.random() * 100}vw`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${Math.random() * 20 + 10}s`,
              "--angle": `${Math.random() * 360}deg`,
            }}
          />
        ))}
      </div>

      {/* Main Portfolio */}
      <div
        className={`portfolio-container ${isVisible ? "animate" : ""}`}
        ref={containerRef}
      >
        <h1 className="portfolio-title">Portfolio</h1>
        <div className="portfolio-grid">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card-wrapper reveal"
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <ProjectCard {...project} reverse={true} />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <section id="footer" className="footer-section">
        <Footer />
      </section>
    </div>
  );
};

export default Portfolio;
