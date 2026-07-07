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
    note: "GPA 3.09 (Major 3.33)",
  },
];

const skillGroups = [
  {
    label: "Languages",
    tags: ["C", "C++", "Python", "Java", "JavaScript", "Haskell", "Lua", "HTML/CSS"],
  },
  {
    label: "Robotics & ML",
    tags: ["ROS 2 (ros2_control)", "PyTorch", "VLAs (π0.5 / SmolVLA / ACT)", "LeRobot", "NVIDIA Jetson Thor", "CAN bus", "Damiao motors", "PyBullet (IK)", "Real-Time Chunking", "Modal", "Docker", "VR Teleop (Quest 3)"],
  },
  {
    label: "Embedded & Systems",
    tags: ["ESP32", "RP2350 / RP2040 (Pico)", "PlatformIO", "Arduino", "BLE", "LiDAR", "RealSense", "Linux (Arch)", "Git"],
  },
  {
    label: "Web & Full-Stack",
    tags: ["React", "Node.js", "Express", "MongoDB", "REST APIs", "WebGL"],
  },
];

const spokenLanguages = [
  { name: "English", level: "Fluent" },
  { name: "Spanish", level: "Native (Bilingual)" },
];

const marqueeTags = [
  "ROS 2", "PyTorch", "VLAs", "π0.5", "SmolVLA", "ACT", "LeRobot",
  "Jetson Thor", "CAN bus", "Docker", "C++", "Python", "Modal",
  "ESP32", "RP2350", "React", "Linux", "PlatformIO", "PyBullet",
];

/* ─────────────── Main column data ─────────────── */

const experience = [
  {
    role: "Founding Engineer",
    company: "Daily's",
    companyUrl: "https://dailys.inc",
    period: "Dec 2025 - June 2026",
    summary:
      "Engineered the full robotics software and learning stack of an autonomous kitchen cell built around a bimanual OpenArm robot (dual 7-DOF arms, 14 DOF).",
    bullets: [
      "Built an end-to-end imitation-learning pipeline: VR teleoperation (Meta Quest 3 over ADB/TCP) for demonstration capture, LeRobot-format data packaging, and cloud training on Modal B200 GPUs",
      "Implemented a 500 Hz real-time C++ control loop (ROS 2 ros2_control) driving 14 Damiao motors over CAN bus with gravity compensation, behind a 6-layer safety system",
      "Trained and benchmarked VLA policies (ACT, SmolVLA, π0, π0-FAST, π0.5 4B) with Real-Time Chunking for ~2x inference speedup, plus DAgger and action-smoothing",
      "Ran the full edge stack on Jetson Thor: model inference (PyTorch), IK (PyBullet), robot control, RP2350 Picos and Raspberry Pi coordination, all on ROS 2 Jazzy with ZED stereo + multi-camera perception",
      "Containerized the platform with Docker for one-step deployment, splitting into teleop and deploy images",
      "Shipped a working end-to-end demo via deterministic trajectory replay after evaluating VLA readiness at current data scale",
    ],
    tags: ["ROS 2", "PyTorch", "VLAs", "π0.5", "LeRobot", "Jetson Thor", "Docker", "CAN bus"],
  },
  {
    role: "Chief Engineer, CroQuest",
    company: "VT CRO",
    period: "Mar 2025 - Jan 2026",
    summary:
      "Led embedded software development for a custom educational handheld game console (ESP32-WROOM) built for Virginia Tech summer camps.",
    bullets: [
      "Wrote 5,000+ lines of C/C++ shipping 8+ retro-style games including Snake, Tetris, Tic-Tac-Toe, plus 2-player BLE Pong and a Mario-inspired platformer",
      "Implemented core firmware integrating LCD, SD storage, and input hardware with asset rendering and UI feedback, plus an SD-card level system for student-authored custom levels",
    ],
    tags: ["C/C++", "ESP32", "BLE", "PlatformIO"],
  },
  {
    role: "Software Engineer, Autonomous Car",
    company: "VT CRO",
    period: "Sep 2024 - May 2025",
    summary:
      "Developed ROS 2 nodes for sensor integration, control, and decision-making on an autonomous RC-scale vehicle for the National Robotics Challenge.",
    bullets: [
      "Integrated LiDAR and Intel RealSense D435 for obstacle detection and environment mapping; implemented SLAM-based autonomous navigation",
      "Used RViz2 and Nav2 for real-time visualization, path planning, and navigation, validated in Gazebo simulation before hardware deployment",
      "Built the embedded control layer (Arduino + Raspberry Pi) for motor control and steering with teleoperation and autonomous driving modes",
    ],
    tags: ["C++", "Python", "ROS 2", "Nav2", "Gazebo", "LiDAR"],
  },
];

const projects = [
  {
    title: "Reinforcement Learning - GridWorld",
    tech: "Python · NumPy · Jupyter",
    description: "Comparative study of Q-Learning, SARSA, and Dyna-Q with a full test suite.",
  },
  {
    title: "My Portfolio",
    tech: "React · Three.js · Node.js",
    description: "Full-stack portfolio with 3D models, scroll snapping, embedded Jupyter notebooks, and custom animations.",
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
    role: "Student Assistant Manager",
    org: "Virginia Tech Dining",
    period: "Jan 2024 - Jan 2026",
    description: "Supervised 10+ student staff in one of VT's largest dining halls; enforced food-safety and service standards with bilingual (English/Spanish) support.",
  },
  {
    role: "Cybersecurity Instructor",
    org: "VT College of Engineering",
    period: "Jun - Aug 2024",
    description: "Designed and taught hands-on cybersecurity lessons (encryption, ethical hacking, CTF challenges) to middle-school summer-camp students.",
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
        <p className="resume-subtitle">Robotics Software Engineer</p>

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
              Leadership &amp; Teaching
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
