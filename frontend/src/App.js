import React, { useState, useCallback } from "react";
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

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const handlePreloaderComplete = useCallback(() => setLoaded(true), []);

  return (
    <>
      <Preloader onComplete={handlePreloaderComplete} />
      <CustomCursor />
      <div className={`app-container ${loaded ? "app-loaded" : ""}`}>
        {/* Noise overlay */}
        <div className="global-grain" />

        <Navbar />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <section id="home" style={{ minHeight: "100vh" }}>
                    <Home loaded={loaded} />
                  </section>

                  <section id="about" className="about-section">
                    <About />
                  </section>

                  <section id="resume" className="resume-section">
                    <Resume />
                  </section>

                  <section id="contact" className="contact-section">
                    <Contact />
                  </section>

                  <section id="footer" className="footer-section">
                    <Footer />
                  </section>
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
