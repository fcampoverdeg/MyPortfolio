// src/components/Portfolio.js
import React, { useEffect, useRef, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import Footer from "./Footer";
import "./Portfolio.css";

const CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Robotics", value: "robotics" },
  { label: "Systems", value: "systems" },
  { label: "Web", value: "web" },
  { label: "ML", value: "ml" },
];

// Define your project data array
const projects = [
  {
    title: '<span class="cq-brand">CroQuest</span> (Game Console)',
    image: "/images/CroQuest/CroQuest_Cover.png",
    description:
      "A fully custom ESP32-based handheld console featuring a full UI system, TFT graphics pipeline, JPEG rendering, SD-based assets, and 8+ original games with Bluetooth multiplayer support.",
    tags: [
      "C",
      "C++",
      "PlatformIO",
      "ESP32",
      "Bluetooth (BLE)",
      "TFT Graphics",
      "SD Card",
    ],
    github: "https://github.com/VT-CRO/CroQuest",
    website: "https://morganw040.wixsite.com/croquest",
    video: "https://www.youtube.com/watch?v=Fxc-An2Zm-w",
    path: "/projects/CroQuest",
    category: "robotics",
    reverse: true,
  },
  {
    title: "Reinforcement Learning in GridWorld",
    image: "/images/general/Logo.png",
    description:
      "A comparative study of Q-Learning, SARSA, and Dyna-Q algorithms in a custom stochastic GridWorld environment with walls, pits, and wind effects. Includes full test suite and Jupyter notebook analysis pipeline.",
    tags: [
      "Python",
      "NumPy",
      "Matplotlib",
      "Jupyter",
      "Machine Learning",
      "RL",
    ],
    github: "https://github.com/fcampoverdeg/reinforcement_learning",
    path: "/projects/reinforcement-learning",
    category: "ml",
    reverse: true,
  },
  {
    title: "Concurrency Web Server",
    image: "/images/general/Logo.png",
    description:
      "A multi-threaded HTTP/1.0 web server in C featuring a configurable thread pool, bounded scheduler queue with Smallest-File-First scheduling, and secure filesystem sandboxing.",
    tags: [
      "C",
      "POSIX Threads",
      "TCP/IP",
      "Concurrency",
      "Linux",
    ],
    github: "https://github.com/fcampoverdeg/Concurrency_Webserver",
    path: "/projects/concurrency-webserver",
    category: "systems",
    reverse: true,
  },
  {
    title: "Virtual Memory Page Table Walker",
    image: "/images/general/Logo.png",
    description:
      "User-space and kernel-space page table walkers in C that visualize Linux virtual-to-physical address translation, comparing vmalloc vs kmalloc allocation strategies.",
    tags: [
      "C",
      "Linux Kernel",
      "Virtual Memory",
      "Kernel Modules",
      "Systems",
    ],
    github: "https://github.com/fcampoverdeg/virtual_memory",
    path: "/projects/virtual-memory",
    category: "systems",
    reverse: true,
  },
  {
    title: "Autonomous Car",
    image: "/images/car/NCB.jpg",
    description:
      "Engineered a fully autonomous vehicle using ROS 2 and Gazebo to navigate obstacle courses for the National Robotics Challenge, including real-time SLAM mapping, path planning, and sensor fusion.",
    tags: ["C++", "ROS 2", "Gazebo", "RViz", "Nav2", "Linux"],
    github: "https://github.com/VT-CRO/NationalRoboticsChallengeCode",
    organization: "https://www.vtcro.org/design-teams/dog",
    path: "/projects/AutonomousCar",
    category: "robotics",
    reverse: true,
  },
  {
    title: "My Portfolio (This Website)",
    image: "/images/general/Logo.png",
    description:
      "A full-stack portfolio built with React, Express, and MongoDB, featuring 3D model rendering with Three.js, animated backgrounds, glass-morphism UI, custom cursor, and preloader animations.",
    tags: [
      "React",
      "JavaScript",
      "Three.js",
      "MongoDB",
      "Express",
      "CSS",
    ],
    github: "https://github.com/fcampoverdeg/MyPortfolio",
    path: "/projects/MyPortfolio",
    category: "web",
    reverse: true,
  },
];

const Portfolio = () => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const location = useLocation();

  const filteredProjects = useMemo(() =>
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter),
  [activeFilter]);

  useEffect(() => {
    const hash = location.hash;

    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "auto" });
        }
      }, 0);
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [location]);

  // Animated Background
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.05 }
    );

    const target = containerRef.current;

    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);

  // Transitions for Project Cards
  useEffect(() => {
    const timer = setTimeout(() => {
      const reveals = document.querySelectorAll(".reveal");

      // Immediately reveal cards already in viewport
      reveals.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add("visible");
        }
      });

      // Observe the rest for scroll
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
            }
          });
        },
        { threshold: 0.1 }
      );

      reveals.forEach((el) => observer.observe(el));

      return () => reveals.forEach((el) => observer.unobserve(el));
    }, 100);

    return () => clearTimeout(timer);
  }, [filteredProjects]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div id="portfolio-top" className="portfolio-page">
      {/* Drifting grid background */}
      <div className="portfolio-bg" />

      {/* Main Portfolio */}
      <div
        className={`portfolio-container ${isVisible ? "animate" : ""}`}
        ref={containerRef}
      >
        <div className="portfolio-header">
          <h1 className="portfolio-title">Portfolio</h1>
          <p className="portfolio-subtitle">A collection of projects I've built and contributed to</p>
          <div className="portfolio-filters">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                className={`filter-chip ${activeFilter === cat.value ? "active" : ""}`}
                onClick={() => setActiveFilter(cat.value)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
        <div className="portfolio-grid">
          {filteredProjects.map((project, index) => (
            <div
              key={project.title}
              className={`project-card-wrapper reveal ${index % 2 === 0 ? "from-left" : "from-right"}`}
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
