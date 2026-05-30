import React, { useState, useCallback, useEffect, useRef } from "react";
import { Routes, Route, Link } from "react-router-dom";

/* Components */
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Resume from "./components/Resume";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import Preloader from "./components/Preloader";

/* Pages */
import Portfolio from "./components/Portfolio";
import CroQuestPage from "./components/projects/CroQuest/CroQuest";
import MyPortfolioPage from "./components/projects/MyPortfolio/MyPortfolio";
import AutonomousCarPage from "./components/projects/AutonomousCar/AutonomousCar";

import "./App.css";

const ProjectPlaceholder = ({ title, github }) => (
  <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#0a0a0a", color: "#e0e0e0", fontFamily: "'Playfair Display', cursive", textAlign: "center", padding: "2rem" }}>
    <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{title}</h1>
    <p style={{ fontFamily: "'Ubuntu', sans-serif", color: "#666", fontSize: "1.1rem", marginBottom: "2rem" }}>Detailed project page coming soon.</p>
    <div style={{ display: "flex", gap: "1rem" }}>
      {github && <a href={github} target="_blank" rel="noopener noreferrer" style={{ color: "#e0e0e0", border: "1px solid rgba(255,255,255,0.15)", padding: "0.6rem 1.2rem", borderRadius: "8px", textDecoration: "none", fontFamily: "'Ubuntu', sans-serif", fontSize: "0.9rem" }}>View on GitHub</a>}
      <a href="/portfolio" style={{ color: "#888", border: "1px solid rgba(255,255,255,0.08)", padding: "0.6rem 1.2rem", borderRadius: "8px", textDecoration: "none", fontFamily: "'Ubuntu', sans-serif", fontSize: "0.9rem" }}>Back to Portfolio</a>
    </div>
  </div>
);

const SNAP_IDS = ["home", "about", "resume", "contact"];

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const handlePreloaderComplete = useCallback(() => setLoaded(true), []);
  const lastSnap = useRef(0);
  const animating = useRef(false);

  useEffect(() => {
    const COOLDOWN = 2200; // long enough to outlast trackpad momentum
    const DURATION = 900; // ms for the scroll animation

    const getTargets = () => {
      const vh = window.innerHeight;
      return SNAP_IDS.map((id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        let top = 0;
        let node = el;
        while (node) { top += node.offsetTop; node = node.offsetParent; }
        const h = el.offsetHeight;
        let snap;
        if (id === "about") {
          snap = Math.max(0, top - Math.max(0, (vh - h) / 2));
        } else if (id === "contact") {
          // Offset down so the background mask fade is above the viewport
          snap = top + Math.round(vh * 0.16);
        } else {
          snap = top;
        }
        return { id, snap };
      }).filter(Boolean);
    };

    // Custom smooth scroll with easing
    const smoothScrollTo = (target) => {
      const start = window.pageYOffset;
      const distance = target - start;
      const startTime = performance.now();
      animating.current = true;

      const ease = (t) => t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2; // easeInOutCubic

      const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / DURATION, 1);
        window.scrollTo(0, start + distance * ease(progress));
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          animating.current = false;
        }
      };
      requestAnimationFrame(step);
    };

    // Cache the Contact scroll target so we know when we're in it
    let contactTop = 0;

    const onWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      const dir = e.deltaY > 0 ? 1 : -1;
      const vh = window.innerHeight;
      const sy = window.pageYOffset;

      // Recalculate contact position
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        let t = 0; let n = contactEl;
        while (n) { t += n.offsetTop; n = n.offsetParent; }
        contactTop = t;
      }

      // If we're near/in Contact and scrolling up, block native scroll IMMEDIATELY
      if (sy >= contactTop - 50 && dir === -1) {
        e.preventDefault();
        if (animating.current) return;
        const now = Date.now();
        if (now - lastSnap.current < COOLDOWN) return;
        lastSnap.current = now;
        const resumeEl = document.getElementById("resume");
        if (resumeEl) {
          let t = 0; let n = resumeEl;
          while (n) { t += n.offsetTop; n = n.offsetParent; }
          const resumeBottom = t + resumeEl.offsetHeight - vh;
          smoothScrollTo(Math.max(0, resumeBottom));
        }
        return;
      }

      // Block during animation
      if (animating.current) { e.preventDefault(); return; }

      const now = Date.now();
      const inCooldown = now - lastSnap.current < COOLDOWN;

      const targets = getTargets();
      if (targets.length === 0) return;

      // Find which section the viewport is actually inside
      let closestIdx = 0;
      for (let i = 0; i < SNAP_IDS.length; i++) {
        const el = document.getElementById(SNAP_IDS[i]);
        if (!el) continue;
        let top = 0;
        let node = el;
        while (node) { top += node.offsetTop; node = node.offsetParent; }
        const bottom = top + el.offsetHeight;
        if (sy + vh / 2 >= top && sy + vh / 2 < bottom) {
          closestIdx = i;
          break;
        }
      }

      // Resume is long — allow free scroll within it, only hijack at edges
      if (closestIdx === 2) {
        const resumeEl = document.getElementById("resume");
        if (resumeEl) {
          const rect = resumeEl.getBoundingClientRect();
          const atTop = rect.top >= -50;
          const atBottom = rect.bottom <= vh + 150;
          if (dir === -1 && !atTop) return;
          if (dir === 1 && !atBottom) return;
        }
      }

      // Contact scrolling down → free scroll (footer, etc.)
      if (closestIdx === 3 && dir === 1) return;

      // During cooldown, block snaps but allow free scroll
      if (inCooldown) { e.preventDefault(); return; }

      const nextIdx = Math.max(0, Math.min(targets.length - 1, closestIdx + dir));
      if (nextIdx === closestIdx) return;

      e.preventDefault();
      lastSnap.current = now;
      smoothScrollTo(targets[nextIdx].snap);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <>
      <Preloader onComplete={handlePreloaderComplete} />
      <CustomCursor />
      <div className={`app-container ${loaded ? "app-loaded" : ""}`}>
        {/* Global animated background */}
        <div className="global-bg-grid" />

        {/* Noise overlay */}
        <div className="global-grain" />

        <Navbar />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Home loaded={loaded} />
                  <About />
                  <Resume />
                  <Contact />
                  <Footer />
                </>
              }
            />

            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/projects/croquest" element={<CroQuestPage />} />
            <Route path="/projects/myportfolio" element={<MyPortfolioPage />} />
            <Route
              path="/projects/autonomouscar"
              element={<AutonomousCarPage />}
            />

            {/* Placeholder routes for new projects — to be expanded */}
            <Route path="/projects/reinforcement-learning" element={<ProjectPlaceholder title="Reinforcement Learning in GridWorld" github="https://github.com/fcampoverdeg/reinforcement_learning" />} />
            <Route path="/projects/concurrency-webserver" element={<ProjectPlaceholder title="Concurrency Web Server" github="https://github.com/fcampoverdeg/Concurrency_Webserver" />} />
            <Route path="/projects/virtual-memory" element={<ProjectPlaceholder title="Virtual Memory Page Table Walker" github="https://github.com/fcampoverdeg/virtual_memory" />} />
            <Route path="/projects/paws-pebbles" element={<ProjectPlaceholder title="Paws & Pebbles" github="https://github.com/fcampoverdeg/Paws-Pebbles" />} />

            <Route
              path="*"
              element={
                <div className="not-found-page">
                  <h1>404</h1>
                  <p>This page doesn't exist.</p>
                  <Link to="/" className="not-found-link">Back to Home</Link>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </>
  );
};

export default App;
