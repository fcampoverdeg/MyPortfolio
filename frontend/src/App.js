import React, { useEffect } from "react";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import Home from "./components/Home";
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
      {/* <Navbar /> */}
      <main>
        <Home />
        {/* <Projects />
        <Contact /> */}
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
