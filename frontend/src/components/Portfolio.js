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
  { label: "C/C++", value: "c" },
  { label: "Python", value: "python" },
  { label: "Embedded", value: "embedded" },
  { label: "Linux", value: "linux" },
  { label: "ROS", value: "ros" },
  { label: "VLA", value: "vla" },
  { label: "Docker", value: "docker" },
  { label: "NVIDIA", value: "nvidia" },
];

// Define your project data array
const projects = [
  {
    title: '<img src="/images/dailys/dailys_banner.svg" alt="Daily\'s" style="height:55px;vertical-align:middle" />',
    image: "/images/dailys/openarm_kitchen.jpeg",
    description:
      "Founding engineer building the full robotics software and learning stack for an autonomous kitchen cell. Bimanual OpenArm robot (14 DOF) with 500 Hz C++ control, VLA imitation learning pipeline, and edge deployment on Jetson Thor.",
    tags: ["ROS 2", "C++", "Python", "PyTorch", "Docker", "Jetson", "CAN Bus", "VLA", "OpenArm"],
    path: "/projects/dailys",
    category: ["robotics", "c", "python", "ml", "ros", "linux", "embedded", "vla", "docker", "nvidia"],
    reverse: true,
  },
  {
    title: '<span class="cq-brand">CroQuest</span> (Game Console)',
    image: "/images/CroQuest/CroQuest_Cover.png",
    description:
      "A fully custom ESP32-based handheld console featuring a full UI system, TFT graphics pipeline, JPEG rendering, SD-based assets, and 8+ original games with Bluetooth multiplayer support.",
    tags: ["C", "C++", "PlatformIO", "ESP32", "Bluetooth (BLE)", "TFT Graphics", "SD Card", "Arduino", "Embedded"],
    github: "https://github.com/VT-CRO/CroQuest",
    website: "https://morganw040.wixsite.com/croquest",
    video: "https://www.youtube.com/watch?v=Fxc-An2Zm-w",
    organization: "https://www.vtcro.org/",
    path: "/projects/CroQuest",
    category: ["robotics", "c", "embedded"],
    reverse: true,
  },
  {
    title: "Reinforcement Learning in GridWorld",
    image: "/images/RL/gridworld_path.png",
    description:
      "A comparative study of Q-Learning, SARSA, and Dyna-Q algorithms in a custom stochastic GridWorld environment with walls, pits, and wind effects. Includes full test suite and Jupyter notebook analysis pipeline.",
    tags: ["Python", "NumPy", "Matplotlib", "Jupyter", "Machine Learning", "RL", "SciPy"],
    github: "https://github.com/fcampoverdeg/reinforcement_learning",
    path: "/projects/reinforcement-learning",
    category: ["ml", "python"],
    reverse: true,
  },
  {
    title: "Autonomous Car",
    image: "/images/car/car_front.jpg",
    description:
      "Engineered a fully autonomous vehicle using ROS 2 and Gazebo to navigate obstacle courses for the National Robotics Challenge, including real-time SLAM mapping, path planning, and sensor fusion.",
    tags: ["C++", "Python", "ROS 2", "Gazebo", "RViz", "Nav2", "SLAM", "LiDAR", "Linux"],
    github: "https://github.com/VT-CRO/NationalRoboticsChallengeCode",
    organization: "https://www.vtcro.org/",
    path: "/projects/AutonomousCar",
    category: ["robotics", "c", "python", "linux", "ros"],
    reverse: true,
  },
  {
    title: "My Portfolio (This Website)",
    image: "/images/general/Logo.png",
    description:
      "A full-stack portfolio built from scratch with React, Three.js, and Express. Features custom scroll snapping, ROS computation graph background, 3D model viewer, embedded Jupyter notebooks, and a monochrome design system.",
    tags: ["React", "JavaScript", "Three.js", "Node.js", "Express", "MongoDB", "CSS", "Netlify"],
    github: "https://github.com/fcampoverdeg/MyPortfolio",
    path: "/projects/MyPortfolio",
    category: ["web"],
    reverse: true,
  },
  {
    title: "Concurrency Web Server",
    image: "/images/general/concurrency_arch.svg",
    description:
      "A multi-threaded HTTP/1.0 web server in C featuring a configurable thread pool, bounded scheduler queue with Smallest-File-First scheduling, and secure filesystem sandboxing.",
    tags: ["C", "POSIX Threads", "TCP/IP", "HTTP", "Concurrency", "Sockets", "Linux", "Makefile"],
    github: "https://github.com/fcampoverdeg/Concurrency_Webserver",
    path: "/projects/concurrency-webserver",
    category: ["systems", "c", "linux"],
    reverse: true,
  },
  {
    title: "Virtual Memory Page Table Walker",
    image: "/images/general/virtual_memory_arch.svg",
    description:
      "User-space and kernel-space page table walkers in C that visualize Linux virtual-to-physical address translation, comparing vmalloc vs kmalloc allocation strategies.",
    tags: ["C", "Linux Kernel", "Virtual Memory", "Kernel Modules", "POSIX", "Makefile", "Systems"],
    github: "https://github.com/fcampoverdeg/virtual_memory",
    path: "/projects/virtual-memory",
    category: ["systems", "c", "linux"],
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
      : projects.filter((p) => p.category.includes(activeFilter)),
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
