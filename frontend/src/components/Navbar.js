// src/components/Navbar.js

import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-scroll";
import {
  faHome,
  faUser,
  faFile,
  //   faProjectDiagram,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuBtnRef = useRef(null);

  // Hide sidebar automatically when window resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle hamburger menu on click
  useEffect(() => {
    const menuBtn = menuBtnRef.current;
    if (menuBtn) {
      if (menuOpen) {
        menuBtn.classList.add("is-active");
      } else {
        menuBtn.classList.remove("is-active");
      }
    }
  }, [menuOpen]);

  return (
    <>
      {/* ====== Hamburger Toggle Button ====== */}
      <div
        className={`mobile-nav-toggle`}
        id="mobile-menu"
        ref={menuBtnRef}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/*======= Side Bar Menu =======*/}
      <div className={`profile ${menuOpen ? "active" : "hidden"}`}>
        {/*======= Nav Menu =======*/}
        <ul className="nav-menu">
          {/*------- Home -------*/}
          <li>
            <Link
              className="nav-link"
              to="home"
              smooth={true}
              duration={500}
              spy={true}
              activeClass="active"
            >
              <FontAwesomeIcon icon={faHome} />
              <span> &nbsp;Home</span>
            </Link>
          </li>
          {/*------- About -------*/}
          <li>
            <Link
              className="nav-link"
              to="about"
              smooth={true}
              duration={500}
              spy={true}
              activeClass="active"
            >
              <FontAwesomeIcon icon={faUser} />
              <span> &nbsp;About</span>
            </Link>
          </li>
          {/*------- Resume -------*/}
          <li>
            <Link
              className="nav-link"
              to="resume"
              smooth={true}
              duration={500}
              spy={true}
              activeClass="active"
            >
              <FontAwesomeIcon icon={faFile} />
              <span> &nbsp;Resume</span>
            </Link>
          </li>
          {/*------- Linkedin -------*/}
          <li>
            <a
              className="nav-link"
              href="https://www.linkedin.com/in/fcampoverdeg/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} />
              <span> &nbsp;LinkedIn</span>
            </a>
          </li>
          {/*------- GitHub fcampoverdeg -------*/}
          <li>
            <a
              className="nav-link"
              href="https://github.com/fcampoverdeg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} />
              <span> &nbsp;GitHub</span>
            </a>
          </li>
          {/*------- GitHub fcampoverdeg-dev -------*/}
          <li>
            <a
              className="nav-link"
              href="https://github.com/fcampoverdeg-dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} />
              <span> &nbsp;GitHub</span>
            </a>
          </li>
          {/*------- Contact -------*/}
          <li>
            <Link
              className="nav-link"
              to="contact"
              smooth={true}
              duration={500}
              spy={true}
              activeClass="active"
            >
              <FontAwesomeIcon icon={faEnvelope} />
              <span> &nbsp;Contact</span>
            </Link>
          </li>
        </ul>
        {/*======= Nav Menu Ends =======*/}
      </div>
    </>
  );
};

export default Navbar;
