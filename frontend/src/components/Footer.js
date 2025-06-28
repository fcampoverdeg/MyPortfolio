import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUserGraduate,
  faSchool,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

import "./Footer.css";

const Footer = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const githubRef = useRef();
  const emailRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        githubRef.current &&
        !githubRef.current.contains(e.target) &&
        emailRef.current &&
        !emailRef.current.contains(e.target)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isMobile = window.innerWidth <= 768;

  return (
    <footer className="footer-container">
      <div className="footer-inner">
        <div className="footer-links">
          {/*------- GitHub Dropdown -------*/}
          <div
            className="footer-dropdown"
            ref={githubRef}
            onClick={() =>
              isMobile &&
              setOpenDropdown(openDropdown === "github" ? null : "github")
            }
          >
            <div className="footer-link nav-link">
              <FontAwesomeIcon icon={faGithub} className="footer-icon" />
              <span className="footer-text">GitHub</span>
              <span
                className={`arrow ${openDropdown === "github" ? "rotate" : ""}`}
              >
                ▼
              </span>
            </div>
            <div
              className={`dropdown-menu ${
                openDropdown === "github" && isMobile ? "open" : ""
              }`}
            >
              <a
                href="https://github.com/fcampoverdeg-dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faSchool} className="dropdown-icon" />
                <span>School</span>
              </a>
              <a
                href="https://github.com/fcampoverdeg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faUserGraduate}
                  className="dropdown-icon"
                />
                <span>Personal</span>
              </a>
            </div>
          </div>

          {/*------- LinkedIn -------*/}
          <a
            href="https://www.linkedin.com/in/fcampoverdeg/"
            className="footer-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} className="footer-icon" />
            <span className="footer-text">LinkedIn</span>
          </a>

          {/*------- Email Dropdown -------*/}
          <div
            className="footer-dropdown"
            ref={emailRef}
            onClick={() =>
              isMobile &&
              setOpenDropdown(openDropdown === "email" ? null : "email")
            }
          >
            <div className="footer-link nav-link">
              <FontAwesomeIcon icon={faEnvelope} className="footer-icon" />
              <span className="footer-text">Email</span>
              <span
                className={`arrow ${openDropdown === "email" ? "rotate" : ""}`}
              >
                ▼
              </span>
            </div>
            <div
              className={`dropdown-menu ${
                openDropdown === "email" && isMobile ? "open" : ""
              }`}
            >
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=fcampoverdeg@vt.edu"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faSchool} className="dropdown-icon" />
                <span>School</span>
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=fcampoverdeg@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faUserGraduate}
                  className="dropdown-icon"
                />
                <span>Personal</span>
              </a>
            </div>
          </div>
        </div>
        <p className="footer-copy">
          © {new Date().getFullYear()} Felipe Campoverde. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
