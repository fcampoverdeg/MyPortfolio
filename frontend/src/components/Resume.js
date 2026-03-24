import React, { useEffect, useRef, useState } from "react";

import {
  faFilePdf,
  faDownload,
  faFileWord,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Resume.css";

const leftSections = [
  {
    title: "Education",
    entries: [
      {
        title: "Virginia Tech, College of Engineering",
        tech: "B.S. in Computer Science — GPA 3.0 — Expected May 2026",
      },
    ],
  },
  {
    title: "Experience",
    entries: [
      {
        title: "Robotics Lead Software Engineer – Dailys",
        tech: "2025 – Present",
        highlights: [
          "Lead the robotics division, overseeing hardware and software integration",
          "Develop and deploy robotic systems for real-world applications",
          "Drive technical decisions across the robotics engineering stack",
        ],
      },
      {
        title: "Co-Founder & CTO – CroQuest LLC",
        tech: "June 2025 – Present",
        highlights: [
          "Co-founded an ed-tech company delivering hands-on STEM programs",
          "Taught 100+ students electronics and embedded programming",
          "Guide technical roadmap and school partnerships",
        ],
      },
      {
        title: "Chief Software Engineer – CroQuest, VT CRO",
        tech: "March 2025 – June 2025",
        highlights: [
          "Built an ESP32 handheld console — 5,000+ lines of C/C++, 8+ games",
          "Designed BLE multiplayer, TFT graphics pipeline, and SD asset loading",
          "Featured in VT NEWS",
        ],
      },
      {
        title: "Cybersecurity Instructor – Virginia Tech",
        tech: "May 2024 – August 2024",
        highlights: [
          "Taught encryption, network security, and ethical hacking to students",
        ],
      },
      {
        title: "Student Assistant Manager – VT Dining",
        tech: "January 2024 – Present",
        highlights: [
          "Supervise 10+ staff; bilingual (EN/ES) support in fast-paced service",
        ],
      },
    ],
  },
];

const rightSections = [
  {
    title: "Skills",
    entries: [
      {
        highlights: [
          "C, C++, Python, Java, JavaScript, Swift, Haskell, Lua",
          "React, Node.js, Express, MongoDB, REST APIs, Three.js",
          "ESP32, Arduino, PlatformIO, BLE, ROS 2, Gazebo, Nav2",
          "Linux (Arch), Git, Neovim, POSIX Threads, Kernel Modules",
          "NumPy, Matplotlib, Jupyter, Reinforcement Learning",
          "iOS (Xcode, UIKit), Blender, WebGL, Netlify",
        ],
      },
    ],
  },
  {
    title: "Projects",
    entries: [
      {
        title: "Reinforcement Learning — GridWorld",
        tech: "Python, NumPy, Jupyter",
        highlights: [
          "Comparative study of Q-Learning, SARSA, and Dyna-Q with full test suite",
        ],
      },
      {
        title: "Fork/Join Threadpool",
        tech: "C, POSIX Threads",
        highlights: [
          "High-performance threadpool with work-stealing and thread-safe queues",
        ],
      },
      {
        title: "Concurrency Web Server",
        tech: "C, TCP/IP",
        highlights: [
          "Multi-threaded HTTP/1.0 server with SFF scheduling and sandboxing",
        ],
      },
      {
        title: "Virtual Memory Walker",
        tech: "C, Linux Kernel",
        highlights: [
          "User-space and kernel-space page table walkers for address translation",
        ],
      },
    ],
  },
  {
    title: "Extracurriculars",
    entries: [
      {
        title: "Software Engineer – VT CRO",
        tech: "Sep 2024 – Jun 2025",
        highlights: [
          "Autonomous navigation with SLAM, ROS 2, LiDAR, and RealSense",
        ],
      },
      {
        title: "Peer Mentor – Ceed, Virginia Tech",
        tech: "Sep 2024 – Dec 2024",
        highlights: [
          "Mentored first-year engineering students through workshops",
        ],
      },
      {
        title: "Linux Systems",
        tech: "2019 – Present",
        highlights: [
          "Arch daily driver; Hyperland WM, Lua/Haskell/Bash configs, kernel debugging",
        ],
      },
    ],
  },
];

const EntryCard = ({ entry, index, side }) => (
  <div className={`timeline-entry timeline-${side}`} style={{ "--entry-index": index }}>
    <div className="timeline-branch" />
    <div className="timeline-node" />
    <div className="project-entry">
      {entry.title && <h3 className="project-title">{entry.title}</h3>}
      {entry.tech && <p className="project-tech">{entry.tech}</p>}
      {entry.descriptions &&
        entry.descriptions.map((d, i) => (
          <p key={i} className="project-description">{d}</p>
        ))}
      {entry.highlights && (
        <ul className="project-highlights">
          {entry.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

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

  let entryIndex = 0;

  return (
    <div
      id="resume"
      ref={containerRef}
      className={`resume-container ${isVisible ? "animate" : ""}`}
    >
      <div className="resume-header">
        <h1 className="resume-title">Resume</h1>
        <p className="resume-subtitle">Education, skills, and experience</p>

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

      <div className="resume-timeline">
        {/* Center trunk line */}
        <div className="timeline-trunk" />

        <div className="resume-wrapper">
          <div className={`resume-left ${isVisible ? "slide-in-left" : ""}`}>
            {leftSections.map((section, si) => (
              <div key={si} className="resume-section-block">
                <h2 className="resume-project">{section.title}</h2>
                {section.entries.map((entry, ei) => (
                  <EntryCard key={ei} entry={entry} index={entryIndex++} side="left" />
                ))}
              </div>
            ))}
          </div>

          <div className={`resume-right ${isVisible ? "slide-in-right" : ""}`}>
            {rightSections.map((section, si) => (
              <div key={si} className="resume-section-block">
                <h2 className="resume-project">{section.title}</h2>
                {section.entries.map((entry, ei) => (
                  <EntryCard key={ei} entry={entry} index={entryIndex++} side="right" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
