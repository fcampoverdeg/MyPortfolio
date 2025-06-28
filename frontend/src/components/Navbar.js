// src/components/Navbar.js

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import {
  faHome,
  faUser,
  faFile,
  faCode,
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
  const [animateSidebar, setAnimateSidebar] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation(); // Extra Pages

  // Router to go back to main Page
  const navigate = useNavigate();

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

  // Detect outside click on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        menuBtnRef.current &&
        !menuBtnRef.current.contains(event.target) &&
        window.innerWidth < 769
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // Starting Animation Side Bar
  useEffect(() => {
    if (window.innerWidth >= 768) {
      setAnimateSidebar(true);
    }
  }, []);

  // Highlight the section where the user is at
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    if (location.pathname === "/") {
      sections.forEach((section) => observer.observe(section));

      // Immediately check which section is already visible
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const inView = rect.top >= 0 && rect.top < window.innerHeight * 0.6;
        if (inView) {
          setActiveSection(section.id);
        }
      });
    }

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [location.pathname]); // Re-run on route change

  return (
    <>
      {/* ====== Hamburger Toggle Button ====== */}
      <div
        className={`mobile-nav-toggle ${menuOpen ? "is-active" : ""}`}
        id="mobile-menu"
        ref={menuBtnRef}
        onClick={(e) => {
          e.stopPropagation(); // Prevent click bubbling
          setMenuOpen((prev) => !prev);
        }}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      {/*======= Side Bar Menu =======*/}
      <div
        className={`profile ${menuOpen ? "active" : ""} ${
          animateSidebar ? "sidebar-animate-in" : ""
        }`}
        ref={sidebarRef}
      >
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
              onClick={() => {
                if (window.innerWidth < 768) {
                  setMenuOpen(false);
                }
              }}
            >
              <FontAwesomeIcon icon={faPaypal} />
            </a>
            {/*------- Linkedin -------*/}
            <a
              href="https://www.linkedin.com/in/fcampoverdeg/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (window.innerWidth < 768) {
                  setMenuOpen(false);
                }
              }}
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            {/*------- WhatsApp -------*/}
            <a
              href="https://wa.me/8043565749"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (window.innerWidth < 768) {
                  setMenuOpen(false);
                }
              }}
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
          <div
            className={`nav-link ${
              location.pathname === "/" && activeSection === "home"
                ? "active"
                : ""
            }`}
            onClick={() => {
              if (window.innerWidth < 768) setMenuOpen(false);
              navigate("/");
              setTimeout(() => {
                const section = document.getElementById("home");
                if (section) section.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
          >
            <FontAwesomeIcon icon={faHome} />
            <span> &nbsp;Home</span>
          </div>

          {/*------- About -------*/}
          <div
            className={`nav-link ${
              location.pathname === "/" && activeSection === "about"
                ? "active"
                : ""
            }`}
            href="#about"
            onClick={(e) => {
              e.preventDefault(); // prevent default jump
              if (window.innerWidth < 768) setMenuOpen(false);

              // Navigate to about route and then scroll
              navigate("/");
              setTimeout(() => {
                // Scroll to the section manually
                const section = document.getElementById("about");
                if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                }
              }, 100);
            }}
          >
            <FontAwesomeIcon icon={faUser} />
            <span> &nbsp;About</span>
          </div>

          {/*------- Resume -------*/}
          <div
            className={`nav-link ${
              location.pathname === "/" && activeSection === "resume"
                ? "active"
                : ""
            }`}
            href="#resume"
            onClick={(e) => {
              e.preventDefault(); // prevent default jump
              if (window.innerWidth < 768) setMenuOpen(false);

              // Navigate to resume route and then scroll
              navigate("/");
              setTimeout(() => {
                // Scroll to the section manually
                const section = document.getElementById("resume");
                if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                }
              }, 200);
            }}
          >
            <FontAwesomeIcon icon={faFile} />
            <span> &nbsp;Resume</span>
          </div>

          {/*------- Portfolio -------*/}
          <Link
            to="/portfolio"
            className={`nav-link ${
              location.pathname === "/portfolio" ? "active" : ""
            }`}
            onClick={() => {
              if (window.innerWidth < 768) setMenuOpen(false);
            }}
          >
            <FontAwesomeIcon icon={faCode} />
            <span> &nbsp;Portfolio</span>
          </Link>

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
          <a
            className={`nav-link ${
              location.pathname === "/" && activeSection === "contact"
                ? "active"
                : ""
            }`}
            href="#contact"
            onClick={(e) => {
              e.preventDefault(); // prevent default jump
              if (window.innerWidth < 768) setMenuOpen(false);

              // Navigate to contact route and then scroll
              navigate("/");
              setTimeout(() => {
                // Scroll to the section manually
                const section = document.getElementById("contact");
                if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                }
              }, 100);
            }}
          >
            <FontAwesomeIcon icon={faEnvelope} />
            <span> &nbsp;Contact</span>
          </a>
        </ul>
        {/*======= Nav Menu Ends =======*/}
      </div>
    </>
  );
};

export default Navbar;
