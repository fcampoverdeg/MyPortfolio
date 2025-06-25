import React, { useState, useEffect } from "react";
import TypewriterEffect from "./TypewriterEffect";

import "./Home.css";

const Home = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="home" className="home-container">
      <div className="overlay">
        <div className="home-content">
          <h1 className="home-title">Felipe S. Campoverde</h1>
          {mounted && (
            <h2 className="home-subtitle">
              I’m a <TypewriterEffect />
            </h2>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
