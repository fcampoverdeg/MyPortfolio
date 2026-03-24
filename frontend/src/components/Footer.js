import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-inner">
        <div className="footer-links">
          <a
            href="https://github.com/fcampoverdeg"
            className="footer-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} className="footer-icon" />
            <span>Personal</span>
          </a>

          <a
            href="https://github.com/fcampoverdeg-dev"
            className="footer-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} className="footer-icon" />
            <span>School</span>
          </a>

          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=fcampoverdeg@gmail.com"
            className="footer-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faEnvelope} className="footer-icon" />
            <span>Email</span>
          </a>

          <a
            href="https://www.linkedin.com/in/fcampoverdeg/"
            className="footer-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} className="footer-icon" />
            <span>LinkedIn</span>
          </a>
        </div>
        <p className="footer-copy">
          &copy; {new Date().getFullYear()} Felipe Campoverde. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
