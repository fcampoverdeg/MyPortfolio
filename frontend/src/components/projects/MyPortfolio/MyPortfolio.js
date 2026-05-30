import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import TechStackIcons from "./TechStackIcons";
import Footer from "../../Footer";
import "./MyPortfolio.css";

const techStack = [
  "React", "JavaScript", "Three.js", "Node.js", "Express",
  "MongoDB", "CSS3", "Vite", "Netlify",
];

const features = [
  {
    title: "Monochrome Dark Theme",
    description: "Custom design system built from scratch. No templates, no UI libraries. Every pixel is intentional, from the animated preloader to the metallic button effects.",
  },
  {
    title: "Scroll Snapping",
    description: "Custom wheel-hijacking scroll system with easeInOutCubic animation. Sections snap into place as you scroll, with free-scroll zones for longer content.",
  },
  {
    title: "ROS Computation Graph",
    description: "The Contact section background features an animated ROS node graph with data pulses flowing between nodes, carousel drift, and breathing animations.",
  },
  {
    title: "3D Model Viewer",
    description: "Interactive Three.js viewer for the CroQuest console with disassemble/reassemble animation and per-part highlighting using React Three Fiber.",
  },
  {
    title: "Jupyter Notebook Embed",
    description: "Full Jupyter notebooks rendered as dark-themed HTML inside an iframe with tabbed navigation, supporting code cells, outputs, and inline images.",
  },
  {
    title: "Typewriter Effect",
    description: "The About section types out text character by character with a single blinking cursor that moves between paragraphs sequentially.",
  },
];

// First commit date
const DEPLOY_DATE = new Date("2024-11-01T00:00:00");

const DeployCounter = () => {
  const [elapsed, setElapsed] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const diff = now - DEPLOY_DATE;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);
      setElapsed(`${days}d ${String(hours).padStart(2, "0")}h ${String(mins).padStart(2, "0")}m ${String(secs).padStart(2, "0")}s`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mp-deploy">
      <span className="mp-deploy-dot" />
      <span className="mp-deploy-text">Live for {elapsed}</span>
    </div>
  );
};

const stats = [
  { value: 6, suffix: "", label: "Project Pages" },
  { value: 15, suffix: "+", label: "Components" },
  { value: 8, suffix: "K+", label: "Lines of Code" },
  { value: 3, suffix: "", label: "3D Models" },
  { value: 8, suffix: "", label: "Notebooks Embedded" },
  { value: 100, suffix: "%", label: "Built from Scratch" },
];

const AnimatedCounter = ({ value, suffix, duration = 1500 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  const startCount = useCallback(() => {
    if (started.current) return;
    started.current = true;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value, duration]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) startCount(); },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, [startCount]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const MyPortfolioPage = () => {
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
    const reveals = document.querySelectorAll(".mp-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("mp-visible");
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => reveals.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <>
      <div id="myportfoliothiswebsite-top" className="mp-page">
        {/* ========== HERO ========== */}
        <div className="mp-hero">
          <div className="mp-hero-content">
            <Link to="/portfolio" className="mp-back-btn">
              <FontAwesomeIcon icon={faArrowLeft} /> Back to Portfolio
            </Link>
            <p className="mp-hero-label">Full-Stack &middot; React &middot; Three.js</p>
            <h1 className="mp-hero-title">My Portfolio</h1>
            <p className="mp-hero-subtitle">
              The website you're looking at right now. A full-stack portfolio
              built from scratch with React, custom animations, 3D rendering,
              embedded Jupyter notebooks, and a monochrome design system.
            </p>
            <div className="mp-hero-buttons">
              <a
                href="https://github.com/fcampoverdeg/MyPortfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="mp-btn mp-btn-primary"
              >
                <FontAwesomeIcon icon={faGithub} /> View on GitHub
              </a>
            </div>
            <DeployCounter />
          </div>
        </div>

        {/* ========== TECH STACK ========== */}
        <div className="mp-section mp-reveal">
          <div className="mp-section-inner">
            <h2 className="mp-section-title">Tech Stack</h2>
            <TechStackIcons />
          </div>
        </div>

        {/* ========== OVERVIEW ========== */}
        <div className="mp-section mp-reveal">
          <div className="mp-section-inner">
            <h2 className="mp-section-title">Overview</h2>
            <p className="mp-section-text">
              This isn't a template. Every component, animation, and design
              decision was built from scratch to reflect who I am as an engineer.
              The site serves as both a technical showcase and a personal
              expression, demonstrating skills across frontend development, 3D
              graphics, and backend integration.
            </p>
            <p className="mp-section-text">
              The frontend is a React SPA with custom scroll mechanics, animated
              backgrounds, and interactive project pages. The backend uses
              Express and MongoDB to handle the contact form. Everything is
              deployed on Netlify with continuous deployment from GitHub.
            </p>
          </div>
        </div>

        {/* ========== STATS ========== */}
        <div className="mp-section mp-reveal">
          <div className="mp-section-inner">
            <div className="mp-stats">
              {stats.map((s, i) => (
                <div key={i} className="mp-stat" style={{ animationDelay: `${i * 0.1}s` }}>
                  <span className="mp-stat-value">
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </span>
                  <span className="mp-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========== FEATURES ========== */}
        <div className="mp-section mp-reveal">
          <div className="mp-section-inner">
            <h2 className="mp-section-title">Key Features</h2>
            <div className="mp-features-grid">
              {features.map((f, i) => (
                <div key={i} className="mp-feature-card">
                  <div className="mp-feature-num">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="mp-feature-name">{f.title}</h3>
                  <p className="mp-feature-desc">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========== DESIGN SYSTEM ========== */}
        <div className="mp-section mp-reveal">
          <div className="mp-section-inner">
            <h2 className="mp-section-title">Design System</h2>
            <p className="mp-section-text">
              Every color, font, and spacing value was chosen intentionally.
              No UI library, no template. Here's the palette that drives the
              entire site:
            </p>
            <div className="mp-palette">
              {[
                { color: "#050505", name: "Background", text: "#888" },
                { color: "#0a0a0a", name: "Surface", text: "#888" },
                { color: "#1a1a1a", name: "Card", text: "#aaa" },
                { color: "#333333", name: "Border", text: "#ccc" },
                { color: "#666666", name: "Muted", text: "#eee" },
                { color: "#888888", name: "Body Text", text: "#fff" },
                { color: "#e0e0e0", name: "Primary", text: "#111" },
                { color: "#f0f0f0", name: "Heading", text: "#111" },
                { color: "#ffffff", name: "Accent", text: "#111" },
              ].map((c, i) => (
                <div key={i} className="mp-swatch" style={{ background: c.color, color: c.text }}>
                  <span className="mp-swatch-name">{c.name}</span>
                  <span className="mp-swatch-hex">{c.color}</span>
                </div>
              ))}
            </div>

            <div className="mp-fonts">
              <div className="mp-font-sample">
                <span className="mp-font-preview" style={{ fontFamily: "'Playfair Display', cursive" }}>Playfair Display</span>
                <span className="mp-font-use">Titles & Headings</span>
              </div>
              <div className="mp-font-sample">
                <span className="mp-font-preview" style={{ fontFamily: "'Ubuntu', sans-serif" }}>Ubuntu</span>
                <span className="mp-font-use">Body Text & UI</span>
              </div>
              <div className="mp-font-sample">
                <span className="mp-font-preview" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>Ubuntu Mono</span>
                <span className="mp-font-use">Code & Data</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========== ARCHITECTURE ========== */}
        <div className="mp-section mp-section-wide mp-reveal">
          <div className="mp-section-inner">
            <h2 className="mp-section-title">Architecture</h2>
            <div className="mp-arch-split">
              <div className="mp-arch-col">
                <h3 className="mp-arch-heading">Frontend</h3>
                <div className="mp-code-block">
                  <div className="mp-code-header">
                    <span className="mp-code-dot mp-dot-red" />
                    <span className="mp-code-dot mp-dot-yellow" />
                    <span className="mp-code-dot mp-dot-green" />
                    <span className="mp-code-filename">src/</span>
                  </div>
                  <pre className="mp-code"><code>{`src/
├── components/
│   ├── Home.js          # Hero, starfield, parallax
│   ├── About.js         # Typewriter bio
│   ├── Resume.js        # Spotlight cards, marquee
│   ├── Contact.js       # ROS graph background
│   ├── Portfolio.js     # Project grid, filters
│   ├── Navbar.js        # Sidebar navigation
│   └── projects/
│       ├── CroQuest/    # 3D model, gallery
│       ├── ReinforcementLearning/
│       ├── ConcurrencyWebserver/
│       ├── VirtualMemory/
│       ├── AutonomousCar/
│       └── MyPortfolio/ # This page
├── App.js               # Routing, scroll snap
└── App.css              # Global styles, fonts`}</code></pre>
                </div>
              </div>

              <div className="mp-arch-col">
                <h3 className="mp-arch-heading">Backend</h3>
                <div className="mp-code-block">
                  <div className="mp-code-header">
                    <span className="mp-code-dot mp-dot-red" />
                    <span className="mp-code-dot mp-dot-yellow" />
                    <span className="mp-code-dot mp-dot-green" />
                    <span className="mp-code-filename">backend/</span>
                  </div>
                  <pre className="mp-code"><code>{`backend/
├── server.js            # Express entry point
├── config/
│   └── db.js            # MongoDB connection
├── models/
│   └── model.js         # Mongoose schemas
├── controllers/
│   └── controller.js    # Contact form logic
└── routes/
    └── contact.js       # API endpoints`}</code></pre>
                </div>

                <div className="mp-stack-list">
                  <h4>Stack</h4>
                  <ul>
                    <li>React + React Router</li>
                    <li>Three.js / React Three Fiber</li>
                    <li>Node.js + Express</li>
                    <li>MongoDB + Mongoose</li>
                    <li>Netlify (CI/CD)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========== SITE MAP ========== */}
        <div className="mp-section mp-section-wide mp-reveal">
          <div className="mp-section-inner">
            <h2 className="mp-section-title">Site Map</h2>
            <p className="mp-section-text">
              How all the pages connect. The main page flows vertically through
              four sections, while the Portfolio branches out to six project pages.
            </p>
            <div className="mp-sitemap">
              <svg className="mp-sitemap-svg" viewBox="0 0 900 380" preserveAspectRatio="xMidYMid meet">
                {/* Main flow connections */}
                <line x1="120" y1="60" x2="120" y2="130" className="mp-map-line" />
                <line x1="120" y1="170" x2="120" y2="240" className="mp-map-line" />
                <line x1="120" y1="280" x2="120" y2="340" className="mp-map-line" />

                {/* Portfolio branch */}
                <line x1="120" y1="150" x2="300" y2="150" className="mp-map-line mp-map-branch" />
                <line x1="300" y1="150" x2="300" y2="40" className="mp-map-line" />
                <line x1="300" y1="150" x2="300" y2="340" className="mp-map-line" />

                {/* Project branches */}
                <line x1="300" y1="50" x2="450" y2="50" className="mp-map-line mp-map-leaf" />
                <line x1="300" y1="100" x2="450" y2="100" className="mp-map-line mp-map-leaf" />
                <line x1="300" y1="150" x2="450" y2="150" className="mp-map-line mp-map-leaf" />
                <line x1="300" y1="200" x2="450" y2="200" className="mp-map-line mp-map-leaf" />
                <line x1="300" y1="250" x2="450" y2="250" className="mp-map-line mp-map-leaf" />
                <line x1="300" y1="300" x2="450" y2="300" className="mp-map-line mp-map-leaf" />
                <line x1="300" y1="340" x2="450" y2="340" className="mp-map-line mp-map-leaf" />

                {/* Main page nodes */}
                <g className="mp-map-node mp-map-main">
                  <rect x="60" y="30" width="120" height="40" rx="8" />
                  <text x="120" y="55">Home</text>
                </g>
                <g className="mp-map-node mp-map-main">
                  <rect x="60" y="130" width="120" height="40" rx="8" />
                  <text x="120" y="155">About</text>
                </g>
                <g className="mp-map-node mp-map-main">
                  <rect x="60" y="240" width="120" height="40" rx="8" />
                  <text x="120" y="265">Resume</text>
                </g>
                <g className="mp-map-node mp-map-main">
                  <rect x="60" y="330" width="120" height="40" rx="8" />
                  <text x="120" y="355">Contact</text>
                </g>

                {/* Portfolio hub */}
                <g className="mp-map-node mp-map-hub">
                  <rect x="240" y="130" width="120" height="40" rx="8" />
                  <text x="300" y="155">Portfolio</text>
                </g>

                {/* Project nodes */}
                <g className="mp-map-node mp-map-project">
                  <rect x="450" y="30" width="160" height="36" rx="6" />
                  <text x="530" y="53" className="cq-brand">CroQuest</text>
                </g>
                <g className="mp-map-node mp-map-project">
                  <rect x="450" y="82" width="160" height="36" rx="6" />
                  <text x="530" y="105">Reinforcement Learning</text>
                </g>
                <g className="mp-map-node mp-map-project">
                  <rect x="450" y="132" width="160" height="36" rx="6" />
                  <text x="530" y="155">Concurrency Server</text>
                </g>
                <g className="mp-map-node mp-map-project">
                  <rect x="450" y="182" width="160" height="36" rx="6" />
                  <text x="530" y="205">Virtual Memory</text>
                </g>
                <g className="mp-map-node mp-map-project">
                  <rect x="450" y="232" width="160" height="36" rx="6" />
                  <text x="530" y="255">Autonomous Car</text>
                </g>
                <g className="mp-map-node mp-map-project">
                  <rect x="450" y="282" width="160" height="36" rx="6" />
                  <text x="530" y="305">My Portfolio</text>
                </g>

                {/* Route labels */}
                <text x="135" y="100" className="mp-map-route">/</text>
                <text x="135" y="215" className="mp-map-route">/</text>
                <text x="135" y="315" className="mp-map-route">/</text>
                <text x="210" y="143" className="mp-map-route">/portfolio</text>
              </svg>
            </div>
          </div>
        </div>

        {/* ========== BUILD TIMELINE ========== */}
        <div className="mp-section mp-reveal">
          <div className="mp-section-inner">
            <h2 className="mp-section-title">Build Timeline</h2>
            <div className="mp-timeline">
              {[
                { date: "Nov 2024", title: "Project Started", desc: "Initial React setup, basic routing, first components" },
                { date: "Dec 2024", title: "First Deploy", desc: "Netlify deployment, custom domain, basic portfolio layout" },
                { date: "Jan 2025", title: "CroQuest Page", desc: "3D model viewer, development gallery, full project showcase" },
                { date: "Feb 2025", title: "Resume Redesign", desc: "Sticky sidebar, spotlight cards, marquee tech tape" },
                { date: "Mar 2025", title: "Contact Redesign", desc: "Cyberpunk city replaced with ROS computation graph" },
                { date: "May 2025", title: "Scroll Snapping", desc: "Custom wheel-hijacking scroll system with easeInOutCubic" },
                { date: "May 2025", title: "Notebook Embed", desc: "Jupyter notebooks rendered as dark-themed HTML with tabbed viewer" },
                { date: "May 2025", title: "All Project Pages", desc: "RL, Concurrency, Virtual Memory, Autonomous Car pages built" },
              ].map((item, i) => (
                <div key={i} className="mp-tl-item">
                  <div className="mp-tl-marker">
                    <div className="mp-tl-dot" />
                  </div>
                  <div className="mp-tl-content">
                    <span className="mp-tl-date">{item.date}</span>
                    <h3 className="mp-tl-title">{item.title}</h3>
                    <p className="mp-tl-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========== WORKFLOW ========== */}
        <div className="mp-section mp-reveal">
          <div className="mp-section-inner">
            <h2 className="mp-section-title">Workflow</h2>
            <div className="mp-workflow">
              <div className="mp-workflow-step">
                <div className="mp-workflow-num">1</div>
                <h3>Design</h3>
                <p>Define aesthetic, sketch layouts, choose typography and color palette</p>
              </div>
              <div className="mp-workflow-arrow" />
              <div className="mp-workflow-step">
                <div className="mp-workflow-num">2</div>
                <h3>Build</h3>
                <p>Structure components, implement animations, integrate APIs</p>
              </div>
              <div className="mp-workflow-arrow" />
              <div className="mp-workflow-step">
                <div className="mp-workflow-num">3</div>
                <h3>Deploy</h3>
                <p>Push to GitHub, auto-deploy via Netlify with production optimizations</p>
              </div>
            </div>
          </div>
        </div>

        {/* ========== LESSONS ========== */}
        <div className="mp-section mp-reveal">
          <div className="mp-section-inner">
            <h2 className="mp-section-title">Lessons Learned</h2>
            <div className="mp-lessons">
              <div className="mp-lesson-card">
                <h3>Component Architecture</h3>
                <p>Building a large SPA from scratch reinforced the importance of modular, reusable components and clean separation of concerns.</p>
              </div>
              <div className="mp-lesson-card">
                <h3>Performance vs Visual Quality</h3>
                <p>Learned to balance rich animations with GPU performance. Replaced blur-heavy effects with transform-only animations for cross-platform smoothness.</p>
              </div>
              <div className="mp-lesson-card">
                <h3>Personal Expression</h3>
                <p>A portfolio isn't just about showing work. It's about communicating who you are through design, structure, and attention to detail.</p>
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

export default MyPortfolioPage;
