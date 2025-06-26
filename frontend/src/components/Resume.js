import React from "react";
import "./Resume.css";

const Resume = () => {
  return (
    <div className="resume-container">
      <h1 className="resume-title">Resume</h1>

      <div className="resume-wrapper">
        {/* LEFT: Education, Skills, Extracurriculars */}
        <div className="resume-left">
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

        {/* Divider */}
        <div className="resume-divider" />

        {/* RIGHT: Work Experience */}
        <div className="resume-right">
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
