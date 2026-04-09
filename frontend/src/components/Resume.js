import React, { useEffect, useRef, useState } from "react";

import {
  faFilePdf,
  faDownload,
  faFileWord,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Resume.css";

/* ─────────────── Sidebar data ─────────────── */

const education = [
  {
    school: "Virginia Tech",
    program: "B.S. Computer Science · College of Engineering",
    period: "Expected December 2026",
    note: "GPA 3.0",
  },
];

const skillGroups = [
  {
    label: "Languages",
    tags: ["C", "C++", "Python", "Java", "JavaScript", "Swift", "Haskell", "Lua"],
  },
  {
    label: "Robotics & ML",
    tags: ["ROS 2", "Gazebo", "Nav2", "Isaac Sim", "PyTorch", "CUDA", "LeRobot", "Hugging Face", "Modal", "VLA / Pi0.5", "RL"],
  },
  {
    label: "Hardware & Embedded",
    tags: ["ESP32", "RP2350", "Arduino", "PlatformIO", "BLE", "CAN bus", "Jetson", "WebXR / Quest"],
  },
  {
    label: "Web & Mobile",
    tags: ["React", "Node.js", "Express", "MongoDB", "Three.js", "WebGL", "iOS / UIKit"],
  },
  {
    label: "Systems & Tools",
    tags: ["Linux (Arch)", "POSIX Threads", "Kernel Modules", "Git", "Neovim", "Blender", "NumPy", "Jupyter"],
  },
];

const spokenLanguages = [
  { name: "English", level: "Fluent" },
  { name: "Spanish", level: "Native" },
];

const marqueeTags = [
  "ROS 2", "PyTorch", "CUDA", "LeRobot", "Pi0.5", "Isaac Sim", "Jetson",
  "WebXR", "C++", "Python", "Modal", "Hugging Face", "ESP32", "CAN bus",
  "React", "Three.js", "Linux", "PlatformIO", "Reinforcement Learning",
];

/* ─────────────── Main column data ─────────────── */

const experience = [
  {
    role: "Lead Robotics Engineer",
    company: "Daily's",
    companyUrl: "https://dailys.inc",
    period: "2025 — Present",
    summary:
      "Building the full robotics software stack for an autonomous, AI-driven food-prep machine. Lead the end-to-end pipeline from low-level motor control to learned manipulation policies.",
    bullets: [
      "Own the real-time ROS 2 / CAN control stack for a 16-DOF bimanual manipulator with safety, homing, and gain-scheduling layers",
      "Built a WebXR VR teleoperation pipeline (Meta Quest) with inverse kinematics for collecting bimanual demonstrations",
      "Train Vision-Language-Action policies (Pi0.5) with PyTorch, LeRobot, and Hugging Face on Modal cloud GPUs",
      "Deploy edge inference and orchestration on NVIDIA Jetson; build simulation workflows in NVIDIA Isaac Sim",
    ],
    tags: ["ROS 2", "PyTorch", "LeRobot", "Pi0.5", "Isaac Sim", "Jetson", "WebXR"],
  },
  {
    role: "Co-Founder & CTO",
    company: "CroQuest LLC",
    period: "June 2025 — December 2025",
    summary:
      "Co-founded an ed-tech company delivering hands-on STEM programs to K-12 students through electronics and embedded programming.",
    bullets: [
      "Taught 100+ students electronics and embedded programming",
      "Lead the technical roadmap and school partnerships",
    ],
    tags: ["Education", "Embedded", "Leadership"],
  },
  {
    role: "Chief Software Engineer",
    company: "CroQuest · VT CRO",
    period: "March 2025 — June 2025",
    summary:
      "Designed and built an ESP32-based handheld game console from the ground up, used as a teaching platform for embedded systems.",
    bullets: [
      "5,000+ lines of C/C++, 8+ original games",
      "BLE multiplayer, TFT graphics pipeline, and SD asset loading",
      "Featured in VT NEWS",
    ],
    tags: ["ESP32", "C/C++", "BLE", "PlatformIO"],
  },
  {
    role: "Cybersecurity Instructor",
    company: "Virginia Tech",
    period: "May 2024 — August 2024",
    summary:
      "Taught encryption, network security, and ethical hacking to high school students through a summer outreach program.",
    tags: ["Security", "Teaching"],
  },
  {
    role: "Student Assistant Manager",
    company: "VT Dining",
    period: "January 2024 — Present",
    summary:
      "Supervise 10+ staff in a fast-paced service environment; provide bilingual (EN/ES) support across the team.",
    tags: ["Leadership", "Bilingual"],
  },
];

const projects = [
  {
    title: "Reinforcement Learning — GridWorld",
    tech: "Python · NumPy · Jupyter",
    description: "Comparative study of Q-Learning, SARSA, and Dyna-Q with a full test suite.",
  },
  {
    title: "Fork/Join Threadpool",
    tech: "C · POSIX Threads",
    description: "High-performance threadpool with work-stealing and thread-safe queues.",
  },
  {
    title: "Concurrency Web Server",
    tech: "C · TCP/IP",
    description: "Multi-threaded HTTP/1.0 server with SFF scheduling and sandboxing.",
  },
  {
    title: "Virtual Memory Walker",
    tech: "C · Linux Kernel",
    description: "User-space and kernel-space page table walkers for address translation.",
  },
];

const extras = [
  {
    role: "Software Engineer",
    org: "VT CRO",
    period: "Sep 2024 — Jun 2025",
    description: "Autonomous navigation with SLAM, ROS 2, LiDAR, and RealSense.",
  },
  {
    role: "Peer Mentor",
    org: "Ceed · Virginia Tech",
    period: "Sep 2024 — Dec 2024",
    description: "Mentored first-year engineering students through workshops.",
  },
  {
    role: "Linux Systems",
    org: "Personal",
    period: "2019 — Present",
    description: "Arch daily driver; Hyperland WM, Lua/Haskell/Bash configs, kernel debugging.",
  },
];

/* ─────────────── Spotlight card wrapper ─────────────── */

const SpotlightCard = ({ children, className = "", style = {} }) => {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      className={`spotlight-card ${className}`}
      onMouseMove={handleMouseMove}
      style={style}
    >
      <div className="spotlight-glow" />
      <div className="spotlight-content">{children}</div>
    </div>
  );
};

/* ─────────────── Component ─────────────── */

const Resume = () => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (node) observer.observe(node);
    return () => { if (node) observer.unobserve(node); };
  }, []);

  return (
    <div
      id="resume"
      ref={containerRef}
      className={`resume-container ${isVisible ? "animate" : ""}`}
    >
      <div className="resume-header">
        <div className="resume-eyebrow">
          <span className="resume-eyebrow-dot" />
          <span>Section · Resume</span>
        </div>
        <h1 className="resume-title shimmer-text">Resume</h1>
        <p className="resume-subtitle">Education · Skills · Experience</p>

        <div className="resume-download-icons">
          <a href="/assets/Campoverde_Felipe.pdf" target="_blank" rel="noopener noreferrer" className="download-btn" title="View PDF">
            <FontAwesomeIcon icon={faFilePdf} />
            <span>View</span>
          </a>
          <a href="/assets/Campoverde_Felipe.pdf" download className="download-btn" title="Download PDF">
            <FontAwesomeIcon icon={faDownload} />
            <span>PDF</span>
          </a>
          <a href="/assets/Campoverde_Felipe.docx" download className="download-btn" title="Download DOCX">
            <FontAwesomeIcon icon={faFileWord} />
            <span>DOCX</span>
          </a>
          <a href="/assets/Campoverde_Felipe.txt" download className="download-btn" title="Download TXT">
            <FontAwesomeIcon icon={faFileAlt} />
            <span>TXT</span>
          </a>
        </div>
      </div>

      <div className="resume-layout">
        {/* ─── Sidebar ─── */}
        <aside className="resume-sidebar">
          <section className="sidebar-block">
            <h2 className="sidebar-heading">
              <span className="sidebar-heading-bar" />
              Education
            </h2>
            {education.map((ed, i) => (
              <div key={i} className="sidebar-card">
                <h3 className="sidebar-card-title">{ed.school}</h3>
                <p className="sidebar-card-meta">{ed.program}</p>
                <p className="sidebar-card-period">{ed.period}</p>
                {ed.note && <p className="sidebar-card-note">{ed.note}</p>}
              </div>
            ))}
          </section>

          <section className="sidebar-block">
            <h2 className="sidebar-heading">
              <span className="sidebar-heading-bar" />
              Skills
            </h2>
            <div className="skill-groups">
              {skillGroups.map((g, i) => (
                <div key={i} className="skill-group">
                  <span className="skill-group-label">{g.label}</span>
                  <div className="skill-tags">
                    {g.tags.map((t, j) => (
                      <span key={j} className="skill-tag">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="sidebar-block">
            <h2 className="sidebar-heading">
              <span className="sidebar-heading-bar" />
              Languages
            </h2>
            <ul className="sidebar-list">
              {spokenLanguages.map((l, i) => (
                <li key={i}>
                  <span className="sidebar-list-name">{l.name}</span>
                  <span className="sidebar-list-meta">{l.level}</span>
                </li>
              ))}
            </ul>
          </section>
        </aside>

        {/* ─── Main column ─── */}
        <main className="resume-main">
          <section className="main-block">
            <h2 className="main-heading">
              <span className="main-heading-index">01</span>
              Experience
            </h2>
            <div className="experience-stack">
              {experience.map((job, i) => (
                <SpotlightCard
                  key={i}
                  className="experience-card"
                  style={{ "--i": i }}
                >
                  <span className="experience-numeral">{String(i + 1).padStart(2, "0")}</span>
                  <header className="experience-head">
                    <div>
                      <h3 className="experience-role">{job.role}</h3>
                      <p className="experience-company">
                        {job.companyUrl ? (
                          <a href={job.companyUrl} target="_blank" rel="noopener noreferrer">
                            {job.company} ↗
                          </a>
                        ) : (
                          job.company
                        )}
                      </p>
                    </div>
                    <span className="experience-period">{job.period}</span>
                  </header>

                  {job.summary && <p className="experience-summary">{job.summary}</p>}

                  {job.bullets && (
                    <ul className="experience-bullets">
                      {job.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  )}

                  {job.tags && (
                    <div className="experience-tags">
                      {job.tags.map((t, j) => (
                        <span key={j} className="skill-tag small">{t}</span>
                      ))}
                    </div>
                  )}
                </SpotlightCard>
              ))}
            </div>
          </section>

          {/* Marquee tech tape */}
          <div className="marquee-tape" aria-hidden="true">
            <div className="marquee-track">
              {[...marqueeTags, ...marqueeTags].map((t, i) => (
                <span key={i} className="marquee-item">
                  {t}
                  <span className="marquee-sep">✦</span>
                </span>
              ))}
            </div>
          </div>

          <section className="main-block">
            <h2 className="main-heading">
              <span className="main-heading-index">02</span>
              Selected Projects
            </h2>
            <div className="project-grid">
              {projects.map((p, i) => (
                <SpotlightCard
                  key={i}
                  className="project-card"
                  style={{ "--i": i }}
                >
                  <h3 className="project-card-title">{p.title}</h3>
                  <p className="project-card-tech">{p.tech}</p>
                  <p className="project-card-desc">{p.description}</p>
                </SpotlightCard>
              ))}
            </div>
          </section>

          <section className="main-block">
            <h2 className="main-heading">
              <span className="main-heading-index">03</span>
              Extracurriculars
            </h2>
            <ul className="extras-list">
              {extras.map((e, i) => (
                <li key={i} className="extras-item">
                  <div className="extras-row">
                    <span className="extras-role">{e.role}</span>
                    <span className="extras-period">{e.period}</span>
                  </div>
                  <p className="extras-org">{e.org}</p>
                  <p className="extras-desc">{e.description}</p>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Resume;
