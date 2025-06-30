import React, { useEffect } from "react";
import TechStackIcons from "./TechStackIcons";
import Footer from "../../Footer";
import "./MyPortfolio.css";

const MyPortfolioPage = () => {
  // Goes at the top of the page
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "auto" });
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, []);

  // Transitions
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal, .reveal-stair");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => {
      reveals.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Auto-slide carousel effect
  useEffect(() => {
    const carousel = document.querySelector(".goals-carousel");
    if (!carousel) return;

    const cards = carousel.querySelectorAll(".goal-card");
    if (cards.length === 0) return;

    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % cards.length;
      const scrollX = cards[index].offsetLeft;

      carousel.scrollTo({
        left: scrollX,
        behavior: "smooth",
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div id="myportfoliocurrentwebsite-top" className="myportfolio-page">
        {/* ---------- HERO ---------- */}
        <section className="hero-section">
          <div className="hero">
            <h1 className="title">MyPortfolio</h1>
            <p className="subtitle">
              A modern portfolio site designed to reflect who I am as a
              developer.
            </p>
          </div>
        </section>

        {/* ---------- OVERVIEW ---------- */}
        <section className="overview-section reveal">
          <div className="overview-inner">
            <h2 className="section-title">Overview</h2>
            <p>
              This portfolio was crafted as both a technical showcase and a
              personal expression. It's a responsive single-page application
              (SPA) built from scratch using modern web technologies, with a
              focus on clarity, performance, and elegance.
            </p>
            <p>
              Each section is carefully designed to provide insight into my
              skills and projects across hardware, software, and full-stack web
              development.
            </p>
          </div>
        </section>

        {/* ---------- GOALS & PURPOSE ---------- */}
        <section className="goals-section reveal">
          <div className="goals-grid">
            {[
              {
                title: "Professional Presence",
                desc: "A platform to represent me online",
              },
              {
                title: "Visual Showcase",
                desc: "Projects presented with elegance",
              },
              { title: "Mobile-First", desc: "Clean UX on any screen size" },
              {
                title: "Modular Design",
                desc: "Built with scalable React components",
              },
              {
                title: "Modern Deployment",
                desc: "Powered by Netlify & CI/CD tooling",
              },
            ].map((goal, idx) => (
              <div className="goal-card" key={idx}>
                <h3>{goal.title}</h3>
                <p>{goal.desc}</p>
              </div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="goals-carousel-wrapper">
            <div className="goals-carousel">
              {[
                {
                  title: "Professional Presence",
                  desc: "A platform to represent me online",
                },
                {
                  title: "Visual Showcase",
                  desc: "Projects presented with elegance",
                },
                { title: "Mobile-First", desc: "Clean UX on any screen size" },
                {
                  title: "Modular Design",
                  desc: "Built with scalable React components",
                },
                {
                  title: "Modern Deployment",
                  desc: "Powered by Netlify & CI/CD tooling",
                },
              ].map((goal, idx) => (
                <div className="goal-card" key={idx}>
                  <h3>{goal.title}</h3>
                  <p>{goal.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- TECH STACK ---------- */}
        <section className="tech-section reveal">
          <h2 className="section-title">Tech Stack</h2>
          <p className="tech-description">
            This site is powered by a carefully chosen set of libraries and
            tools:
          </p>
          <TechStackIcons />
        </section>

        {/* ---------- DESIGN DECISIONS ---------- */}
        <section className="design-section reveal">
          <div className="design-inner">
            <h2 className="section-title">Design Decisions</h2>
            <p>
              The aesthetic is intentionally minimalist, using a black and gold
              palette to evoke a modern, elegant, and slightly retro feel —
              consistent with the visual identity of my embedded projects like
              CroQuest.
            </p>
            <p>
              Fonts are chosen to balance creativity and readability: cursive
              for titles (<em>Playfair Display</em>) and sans-serif for body
              content. The layout uses scroll-triggered animations to guide user
              attention.
            </p>
            <p>
              The responsive sidebar, dropdown footers, and animated elements
              are built to be intuitive across all screen sizes.
            </p>
          </div>
        </section>

        {/* ---------- DEVELOPMENT INSIGHTS ---------- */}
        <section className="dev-section reveal reveal-left">
          <div className="dev-inner">
            <h2 className="section-title">Development Insights</h2>
            <ul>
              <li>SPA built with React + React Router</li>
              <li>State management using Zustand</li>
              <li>
                IntersectionObserver used for scroll-based reveal animations
              </li>
              <li>
                Fully mobile-responsive via media queries and CSS Grid/Flexbox
              </li>
              <li>
                Deployed on Netlify with `_redirects` file for clean routing
              </li>
              <li>Connected to GitHub for continuous deployment</li>
            </ul>
          </div>
        </section>

        {/* ---------- STRUCTURE & STACK ---------- */}
        <section className="structure-section reveal">
          <div className="structure-grid">
            {/* ===== Frontend Column ===== */}
            <div className="structure-left">
              <h2 className="major-section-title">Frontend</h2>

              <h3 className="section-title">File Structure</h3>
              <p>
                The frontend follows a modular structure built with React. Each
                page and component is separated for maintainability and clarity.
              </p>

              <div className="code-container reveal">
                <pre className="code-block">
                  <code>{`src/
├── api/               // Axios setup and API handlers
├── components/        // Pages and UI elements
│   ├── projects/      // Individual project pages
├── images/            // Static assets (logos, photos)
├── App.js             // Main routing and layout
├── index.js           // React entry point`}</code>
                </pre>
              </div>

              <p>
                Components are grouped by page, each with its own `.js` and
                `.css` file. Project views are stored in a `projects/`
                subfolder.
              </p>
              <div className="code-container reveal-stair">
                <pre className="code-block">
                  <code>{`src/components/
├── About.js / .css
├── Contact.js / .css
├── Footer.js / .css
├── Home.js / .css
├── Navbar.js / .css
├── Portfolio.js / .css
├── ProjectCard.js / .css
├── Projects.js
├── Resume.js / .css
├── TypewriterEffect.js
└── projects/
    ├── AutonomousCar/
    ├── CroQuest/
    └── MyPortfolio/`}</code>
                </pre>
              </div>

              <h3 className="section-title">Tech Stack</h3>
              <p>
                The frontend is built with modern libraries and tools to ensure
                responsiveness, interactivity, and a clean development workflow:
              </p>
              <ul>
                <li>
                  <strong>React</strong> – Component-based UI library
                </li>
                <li>
                  <strong>React Router</strong> – Client-side navigation
                </li>
                <li>
                  <strong>Zustand</strong> – Lightweight global state management
                </li>
                <li>
                  <strong>Axios</strong> – REST API communication
                </li>
                <li>
                  <strong>Three.js</strong> – 3D rendering for interactive
                  components
                </li>
                <li>
                  <strong>Vanta.js</strong> – Animated WebGL background (used in
                  Contact section)
                </li>
                <li>
                  <strong>WebGL</strong> – Underlying tech for 3D and animated
                  backgrounds
                </li>
                <li>
                  <strong>Blender</strong> – Used to design and render 3D assets
                  (e.g., CroQuest model)
                </li>
                <li>
                  <strong>Custom CSS</strong> – Layout and responsiveness with
                  Flexbox & Grid
                </li>
                <li>
                  <strong>Font Awesome</strong> – Icon set and social logos
                </li>
                <li>
                  <strong>Intersection Observer</strong> – Scroll-triggered
                  animations
                </li>
                <li>
                  <strong>Netlify</strong> – Deployment, HTTPS, SPA routing, and
                  custom domain
                </li>
                <li>
                  <strong>GitHub</strong> – Source control and continuous
                  deployment
                </li>
                <li>
                  <strong>VS Code</strong> – Dev environment with Prettier +
                  ESLint
                </li>
              </ul>
            </div>

            {/* ===== Backend Column ===== */}
            <div className="structure-right">
              <h2 className="major-section-title">Backend</h2>

              <h3 className="section-title">File Structure</h3>
              <p>
                The backend uses a minimal Express.js setup, separated into
                configuration, routing, models, and controllers to keep
                responsibilities isolated.
              </p>

              <div className="code-container reveal">
                <pre className="code-block">
                  <code>{`backend/
├── server.js           // Main entry point
├── config/
│   └── db.js           // MongoDB connection
├── models/
│   └── model.js        // Mongoose schema
├── controllers/
│   └── controller.js   // Request logic
└── routes/
    └── data.js         // API endpoints`}</code>
                </pre>
              </div>

              <p>
                All data is stored in MongoDB and exposed through RESTful
                endpoints defined in `routes/data.js`, handled by their
                respective controllers.
              </p>

              <h3 className="section-title">Tech Stack</h3>
              <p>
                The backend stack is built for speed, simplicity, and seamless
                integration with the frontend:
              </p>
              <ul>
                <li>
                  <strong>Node.js</strong> – JavaScript runtime for server-side
                  logic
                </li>
                <li>
                  <strong>Express.js</strong> – Lightweight web framework
                </li>
                <li>
                  <strong>MongoDB</strong> – NoSQL database
                </li>
                <li>
                  <strong>Mongoose</strong> – ODM for schema definition and
                  database access
                </li>
                <li>
                  <strong>CORS</strong> – Enables secure frontend-backend
                  communication
                </li>
                <li>
                  <strong>dotenv</strong> – Manages environment variables
                  securely
                </li>
                <li>
                  <strong>GitHub</strong> – Source control and Netlify
                  integration for CI/CD
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ---------- CODE SNIPPET ---------- */}
        <section className="code-snippet-section reveal">
          <div className="code-snippet-inner">
            <h2 className="section-title">Core Routing Setup</h2>
            <p>
              The routing is handled using <strong>React Router</strong>,
              allowing smooth client-side navigation between major views and
              individual project pages.
            </p>
            <pre className="code-block">
              <code>
                {`<Routes>
  {/* Portfolio Overview Page */}
  <Route path="/portfolio" element={<Portfolio />} />
  // Displays the full collection of projects

  {/* CroQuest Project Page */}
  <Route path="/projects/croquest" element={<CroQuestPage />} />
  // Highlights the ESP32-based handheld console, CroQuest

  {/* My Portfolio Project Page */}
  <Route path="/projects/myportfolio" element={<MyPortfolioPage />} />
  // Describes the design and development of this portfolio site

  {/* Autonomous Car Project Page */}
  <Route path="/projects/autonomouscar" element={<AutonomousCarPage />} />
  // Showcases the self-driving car project with vision + control systems
</Routes>`}
              </code>
            </pre>
          </div>
        </section>

        {/* ---------- WORKFLOW ---------- */}
        <section className="workflow-section reveal">
          <div className="workflow-grid">
            <div className="workflow-step">
              <h3>1. Design</h3>
              <p>Sketch out user flow, define aesthetic.</p>
            </div>
            <div className="workflow-step">
              <h3>2. Build</h3>
              <p>Structure components, layout, and interactions.</p>
            </div>
            <div className="workflow-step">
              <h3>3. Deploy</h3>
              <p>Deploy to Netlify with production optimizations.</p>
            </div>
          </div>
        </section>

        {/* ---------- LESSONS LEARNED ---------- */}
        <section className="lessons-section reveal reveal-fade">
          <div className="lessons-inner">
            <h2 className="section-title">Lessons Learned</h2>
            <p>
              This project helped reinforce my understanding of component-based
              architecture, custom animation with raw APIs (not just libraries),
              and the value of clean, reusable design. I also learned the
              nuances of managing mobile-first behavior and deploying an SPA on
              Netlify with proper route handling.
            </p>
            <p>
              It was a great reminder that building a personal site isn't just
              about showing work, it's about communicating who you are, through
              design, structure, and subtle detail.
            </p>
          </div>
        </section>
      </div>
      {/* ---------- FOOTER ---------- */}
      <section className="footer-section">
        <Footer />
      </section>
    </>
  );
};

export default MyPortfolioPage;
