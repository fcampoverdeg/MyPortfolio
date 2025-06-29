import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

/* Components */
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Resume from "./components/Resume";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

/* Pages */
import Portfolio from "./components/Portfolio";
import CroQuestPage from "./components/projects/CroQuest/CroQuest";
import MyPortfolioPage from "./components/projects/MyPortfolio/MyPortfolio";
import AutonomousCarPage from "./components/projects/AutonomousCar/AutonomousCar";

import "./App.css";

const App = () => {
  // Fetching data from the backend API
  useEffect(() => {
    fetch("http://localhost:5000/api/Home")
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <div className="app-container">
      {/* ======= Navbar ======= */}
      <Navbar />
      <main>
        <Routes>
          {/* Home route with all sections */}
          <Route
            path="/"
            element={
              <>
                {/* ======= Section Components ======= */}

                {/* Home */}
                <section id="home" style={{ height: "100vh" }}>
                  <Home />
                </section>

                {/* About */}
                <section
                  id="about"
                  className="about-section"
                  style={{ height: "70vh" }}
                >
                  <About />
                </section>

                {/* Resume */}
                <section
                  id="resume"
                  className="resume-section"
                  style={{ height: "148vh" }}
                >
                  <Resume />
                </section>

                {/* Contact */}
                <section
                  id="contact"
                  className="contact-section"
                  style={{ height: "100vh" }}
                >
                  <Contact />
                </section>

                <section
                  id="footer"
                  className="footer-section"
                  style={{ height: "20vh" }}
                >
                  <Footer />
                </section>
              </>
            }
          />

          {/* Routes (dedicated pages) */}

          {/* Portfolio Page */}
          <Route
            path="/portfolio"
            element={<Portfolio />}
            style={{ height: "250vh" }}
          />

          {/* CroQuest Page */}
          <Route path="/projects/croquest" element={<CroQuestPage />} />

          {/* My Portfolio Page */}
          <Route path="/projects/myportfolio" element={<MyPortfolioPage />} />

          {/* Autonomous Car Page */}
          <Route
            path="/projects/autonomouscar"
            element={<AutonomousCarPage />}
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
