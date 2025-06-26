import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Resume from "./components/Resume";
// import Projects from "./components/Projects";
// import Contact from "./components/Contact";

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
        {/* Section Components */}
        <section id="home" style={{ height: "100vh" }}>
          <Home />
        </section>
        <section id="about" style={{ height: "70vh" }}>
          <About />
        </section>
        <section
          id="resume"
          className="resume-section"
          style={{ height: "148vh" }}
        >
          <Resume />
        </section>
        <section id="contact" style={{ height: "100vh" }}>
          {/* <Contact /> */}
        </section>
      </main>
    </div>
  );
};

export default App;
