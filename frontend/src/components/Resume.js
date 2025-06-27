import React, { useEffect, useRef, useState } from "react";

import {
  faFilePdf,
  faDownload,
  faFileWord,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Resume.css";

const Resume = () => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = containerRef.current; // Store current value

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );

    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node); // Use stored reference
    };
  }, []);

  return (
    <div
      id="resume"
      ref={containerRef}
      className={`resume-container ${isVisible ? "animate" : ""}`}
    >
      <h1 className="resume-title">Resume</h1>

      <div className="resume-download-icons">
        {/* View PDF in browser */}
        <div className="download-block">
          <a
            href="/assets/Campoverde_Felipe.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="download-icon"
            title="View Online (PDF)"
          >
            <FontAwesomeIcon icon={faFilePdf} />
          </a>
          <span>View PDF</span>
        </div>

        {/* Download PDF */}
        <div className="download-block">
          <a
            href="/assets/Campoverde_Felipe.pdf"
            download
            className="download-icon"
            title="Download PDF"
          >
            <FontAwesomeIcon icon={faDownload} />
          </a>
          <span>PDF</span>
        </div>

        {/* Download DOCX */}
        <div className="download-block">
          <a
            href="/assets/Campoverde_Felipe.docx"
            download
            className="download-icon"
            title="Download Word"
          >
            <FontAwesomeIcon icon={faFileWord} />
          </a>

          <span>DOCX</span>
        </div>

        {/* Download TXT */}
        <div className="download-block">
          <a
            href="/assets/Campoverde_Felipe.txt"
            download
            className="download-icon"
            title="Download Plain Text"
          >
            <FontAwesomeIcon icon={faFileAlt} />
          </a>
          <span>TXT</span>
        </div>
      </div>

      <div className="resume-wrapper">
        {/* LEFT: Education, Skills, Extracurriculars */}
        <div className={`resume-left ${isVisible ? "slide-in-left" : ""}`}>
          <h2 className="resume-project">Education</h2>
          <div className="project-entry">
            <h3 className="project-title">
              Virginia Tech, College of Engineering
            </h3>
            <p className="project-tech">
              B.S. in Computer Science, 2024 - 2026
            </p>
            <p className="project-description">GPA: 3.0</p>
          </div>

          <h2 className="resume-project">Skills</h2>
          <div className="project-entry">
            <ul className="project-highlights">
              <li>C, C++, Python, Java, JavaScript, HTML/CSS</li>
              <li>
                Linux, React.js, PlatformIO, Arduino, ROS2, Rviz, Gazebo, Git
              </li>
              <li>Bilingual (English/Spanish), Team Leadership</li>
            </ul>
          </div>

          <h2 className="resume-project">Extracurriculars</h2>
          <div className="project-entry">
            <h3 className="project-title">Software Engineer – VT CRO</h3>
            <p className="project-description">
              Support robotics competitions and development
            </p>

            <h3 className="project-title">Peer Mentor – Ceed</h3>
            <p className="project-description">
              Mentored first-year engineering students
            </p>
          </div>
        </div>

        <div className="resume-spacer" />

        {/* Divider */}
        <div className="resume-divider" />

        <div className="resume-spacer" />

        {/* RIGHT: Work Experience */}
        <div className={`resume-right ${isVisible ? "slide-in-right" : ""}`}>
          <h2 className="resume-project">Experience</h2>

          <div className="project-entry">
            <h3 className="project-title">
              Embedded Software Engineer – VT CRO
            </h3>
            <p className="project-tech">March 2025 – Present</p>
            <ul className="project-highlights">
              <li>Developed GameBoy-style console using ESP32 and C++</li>
              <li>Built games and dynamic content system for students</li>
            </ul>
          </div>

          <div className="project-entry">
            <h3 className="project-title">
              Cybersecurity Instructor – Virginia Tech
            </h3>
            <p className="project-tech">May 2024 – August 2024</p>
            <ul className="project-highlights">
              <li>Taught network security and ethical hacking to students</li>
              <li>Translated complex concepts into engaging lessons</li>
            </ul>
          </div>

          <div className="project-entry">
            <h3 className="project-title">
              Student Assistant Manager – VT Dining
            </h3>
            <p className="project-tech">January 2024 – Present</p>
            <ul className="project-highlights">
              <li>
                Managed food safety, team ops, and bilingual customer support
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
