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
import {
  faGithub,
  faLinkedin,
  faPaypal,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuBtnRef = useRef(null);
  const sidebarRef = useRef(null);

  // Hide sidebar automatically when window rsesizes to desktop
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

  // Detect outside click on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        window.innerWidth < 769
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
      <div className={`profile ${menuOpen ? "active" : ""}`} ref={sidebarRef}>
        {/*======= Profile Picture =======*/}
        <div className="profile-header">
          <img
            src={require("../images/Logo.png")}
            alt="Profile"
            className="profile-image"
          />

          {/* ===== Social Icons Block ===== */}
          <div className="social-icons">
            {/*------- PayPal -------*/}
            <a
              href="https://paypal.me/fcampoverdegdev"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faPaypal} />
            </a>
            {/*------- Linkedin -------*/}
            <a
              href="https://www.linkedin.com/in/fcampoverdeg/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            {/*------- WhatsApp -------*/}
            <a
              href="https://wa.me/8043565749"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
          </div>
          {/* ============================= */}

          <h2 className="profile-name">Felipe S. Campoverde</h2>
        </div>

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
          {/*------- GitHub Hover Toggle -------*/}
          <li className="github-toggle">
            <div className="nav-link">
              <span>
                <FontAwesomeIcon icon={faGithub} />
                &nbsp;GitHub
              </span>
              <span className="arrow"> ▼</span>
            </div>

            <ul className="github-submenu">
              <li>
                <a
                  className="nav-link"
                  href="https://github.com/fcampoverdeg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  &nbsp;🔹 Personal
                </a>
              </li>
              <li>
                <a
                  className="nav-link"
                  href="https://github.com/fcampoverdeg-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  &nbsp;🎓 University
                </a>
              </li>
            </ul>
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
