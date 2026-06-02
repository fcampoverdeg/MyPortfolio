import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import CroQuestGallery from "./CroQuestGallery";
import CroQuestModelViewer from "./CroQuestModel";
import CroQuestCode from "./CroQuestCode";

import Footer from "../../Footer";

import "./CroQuest.css";

const stats = [
  { value: "5,000+", label: "Lines of Code" },
  { value: "8", label: "Classic Games" },
  { value: "BLE", label: "Multiplayer" },
  { value: "ESP32", label: "Powered" },
];

const techStack = [
  "C/C++", "ESP32-WROOM", "PlatformIO", "TFT_eSPI",
  "NimBLE-Arduino", "SD Library", "Bluetooth (BLE)", "8-bit Parallel TFT",
  "JPEG Decoder", "Audio DAC", "Custom Game Engine", "State Sync Protocol",
];

const CroQuestPage = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "auto" });
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, []);

  useEffect(() => {
    const reveals = document.querySelectorAll(".cq-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("cq-visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => reveals.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <>
      <div id="croquestgameconsole-top" className="cq-page">
        {/* ========== HERO ========== */}
        <div className="cq-hero">
          <div className="cq-hero-content">
            <Link to="/portfolio" className="cq-back-btn">
              <FontAwesomeIcon icon={faArrowLeft} /> Back to Portfolio
            </Link>
            <p className="cq-hero-label">VT CRO &middot; Featured in VT NEWS</p>
            <h1 className="cq-hero-title"><span className="cq-brand">CroQuest</span></h1>
            <p className="cq-hero-subtitle">
              A custom-built ESP32 handheld gaming console with Bluetooth
              multiplayer, retro graphics, and 8 classic games
            </p>
            <div className="cq-hero-buttons">
              <a href="https://github.com/VT-CRO/CroQuest" target="_blank" rel="noopener noreferrer" className="cq-btn cq-btn-primary"><FontAwesomeIcon icon={faGithub} /> View on GitHub</a>
              <a href="https://www.youtube.com/watch?v=Fxc-An2Zm-w" target="_blank" rel="noopener noreferrer" className="cq-btn cq-btn-youtube"><FontAwesomeIcon icon={faYoutube} /> Watch Demo</a>
              <a href="https://www.vtcro.org/" target="_blank" rel="noopener noreferrer" className="cq-btn cq-btn-ghost"><img src="/images/general/vtcro_bird.jpg" alt="VT CRO" className="cq-vtcro-icon" /> VT CRO</a>
            </div>
          </div>
          <div className="cq-hero-image">
            <img src="/images/CroQuest/CroQuest_Cover.png" alt="CroQuest Console" />
          </div>
        </div>

        {/* ========== STATS ========== */}
        <div className="cq-stats cq-reveal">
          {stats.map((s, i) => (
            <div key={i} className="cq-stat" style={{ "--stat-i": i }}>
              <span className="cq-stat-value">{s.value}</span>
              <span className="cq-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* ========== OVERVIEW ========== */}
        <div className="cq-section cq-reveal">
          <div className="cq-section-inner cq-split">
            <div className="cq-split-text">
              <h2 className="cq-section-title">What is <span className="cq-brand">CroQuest</span>?</h2>
              <p>
                <span className="cq-brand">CroQuest</span> is a custom-built handheld console powered by an ESP32,
                featuring an 8-bit parallel TFT screen, SD card storage, audio
                output, and Bluetooth multiplayer. The entire system, hardware,
                firmware, and enclosure, was developed from scratch.
              </p>
              <p>
                It includes a modular game engine, custom UI, badge unlock system,
                and 8 preloaded games: Pong, Snake, Tic Tac Toe, Simon,
                Connect 4, Memory, Tetris, and Breakout, all with built-in BLE
                multiplayer support.
              </p>
            </div>
            <div className="cq-split-media">
              <div className="cq-video-embed">
                <iframe
                  src="https://www.youtube.com/embed/Fxc-An2Zm-w"
                  title="CroQuest Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>

        {/* ========== MY ROLE ========== */}
        <div className="cq-section cq-reveal">
          <div className="cq-section-inner">
            <h2 className="cq-section-title">My Role</h2>
            <div className="cq-role-grid">
              <div className="cq-role-card">
                <h3>Chief Engineer & Software Lead</h3>
                <p>Designed the system architecture, developed the full firmware stack, and built the Bluetooth multiplayer and game engine frameworks.</p>
              </div>
              <div className="cq-role-card">
                <h3>Team Collaboration</h3>
                <p>Project concept and visual design led by <strong>Marco Gonzalez Hauger</strong>. Shell design by <strong>Steve Kitomary</strong>. PCB by <strong>Andrew Viola</strong> and <strong>Jonas von Stein</strong>. Code contributions by <strong>Lucas Shadoyan</strong> and <strong>Connor McCue</strong>. Design by <strong>Morgan Weidling</strong> and <strong>Ayra Nirar</strong>. Logistics by <strong>Heesang Han</strong>.</p>
              </div>
              <div className="cq-role-card">
                <h3>Impact</h3>
                <p>Featured in VT NEWS. Led to co-founding <span className="cq-brand">CroQuest</span> LLC, an ed-tech startup teaching 100+ students embedded programming through hands-on workshops.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ========== TECH STACK ========== */}
        <div className="cq-section cq-reveal">
          <div className="cq-section-inner">
            <h2 className="cq-section-title">Tech Stack</h2>
            <div className="cq-tech-grid">
              {techStack.map((t, i) => (
                <span key={i} className="cq-tech-tag" style={{ "--tag-i": i }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ========== GALLERY ========== */}
        <div className="cq-section cq-section-wide cq-reveal">
          <div className="cq-section-inner">
            <h2 className="cq-section-title">Development Gallery</h2>
            <p className="cq-section-desc">
              From early breadboard prototypes to the final polished console, explore
              the journey of building <span className="cq-brand">CroQuest</span> step by step.
            </p>
            <CroQuestGallery />
          </div>
        </div>

        {/* ========== 3D MODEL ========== */}
        <div className="cq-section cq-section-wide cq-reveal">
          <div className="cq-section-inner">
            <h2 className="cq-section-title">3D Model</h2>
            <p className="cq-section-desc">
              Explore the physical shell of the <span className="cq-brand">CroQuest</span> console. Rotate, zoom,
              and disassemble to inspect every detail.
            </p>
            <CroQuestModelViewer />
          </div>
        </div>

        {/* ========== CODE ========== */}
        <div className="cq-section cq-section-wide cq-reveal">
          <div className="cq-section-inner">
            <CroQuestCode />
          </div>
        </div>

        {/* ========== LESSONS ========== */}
        <div className="cq-section cq-reveal">
          <div className="cq-section-inner">
            <h2 className="cq-section-title">Lessons Learned</h2>
            <div className="cq-lessons-grid">
              <div className="cq-lesson-card">
                <h3>Embedded Systems</h3>
                <p>Deep understanding of memory constraints, real-time rendering on microcontrollers, and hardware-software co-design.</p>
              </div>
              <div className="cq-lesson-card">
                <h3>BLE Protocols</h3>
                <p>First time building custom Bluetooth protocols for state synchronization across multiplayer game sessions.</p>
              </div>
              <div className="cq-lesson-card">
                <h3>Team Engineering</h3>
                <p>Learned to align physical design with software architecture across a multi-disciplinary team of 6+ engineers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section id="footer" className="footer-section">
        <Footer />
      </section>
    </>
  );
};

export default CroQuestPage;
