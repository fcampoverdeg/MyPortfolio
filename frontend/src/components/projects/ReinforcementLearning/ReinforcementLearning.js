import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import NotebookViewer from "./NotebookViewer";
import Footer from "../../Footer";
import "./ReinforcementLearning.css";

const algorithms = [
  {
    name: "Q-Learning",
    type: "Off-policy TD Control",
    description:
      "Learns the optimal action-value function directly by updating Q-values toward the maximum future reward, regardless of the policy being followed. Aggressive but can overestimate in stochastic environments.",
    figures: [
      "/images/RL/figs/q_learning/qlearning_return.png",
      "/images/RL/figs/q_learning/qlearning_steps.png",
    ],
  },
  {
    name: "SARSA",
    type: "On-policy TD Control",
    description:
      "Updates Q-values based on the action actually taken, making it more conservative and safer in environments with penalties. Follows its own policy during learning.",
    figures: [
      "/images/RL/figs/sarsa/sarsa_return.png",
      "/images/RL/figs/sarsa/sarsa_steps.png",
    ],
  },
  {
    name: "Dyna-Q",
    type: "Model-based RL + Planning",
    description:
      "Combines real experience with simulated planning steps using a learned world model. Dramatically improves sample efficiency by replaying past transitions.",
    figures: [
      "/images/RL/figs/dyna_q/dynaq_return.png",
      "/images/RL/figs/dyna_q/dynaq_steps.png",
    ],
  },
];

const techStack = [
  "Python",
  "NumPy",
  "Matplotlib",
  "Jupyter",
  "pytest",
  "SciPy",
  "Pandas",
];

const researchQuestions = [
  "How do Dyna-Q planning steps K affect sample efficiency?",
  "How sensitive are Q-Learning, SARSA, and Dyna-Q to \u03B5-greedy schedules?",
  "How robust are policies across seeds, layout changes, and wind noise?",
  "Does model-based planning consistently improve stability and convergence?",
];

const ReinforcementLearningPage = () => {
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
    const reveals = document.querySelectorAll(".rl-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("rl-visible");
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => reveals.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <>
      <div id="reinforcementlearningingridworld-top" className="rl-page">
        {/* ========== HERO ========== */}
        <div className="rl-hero">
          <div className="rl-hero-content">
            <Link to="/portfolio" className="rl-back-btn">
              <FontAwesomeIcon icon={faArrowLeft} /> Back to Portfolio
            </Link>
            <p className="rl-hero-label">RL Capstone &middot; Virginia Tech</p>
            <h1 className="rl-hero-title">Reinforcement Learning</h1>
            <p className="rl-hero-subtitle">
              A comparative study of Q-Learning, SARSA, and Dyna-Q in a custom
              stochastic GridWorld environment with planning and robustness analysis
            </p>
            <div className="rl-hero-buttons">
              <a
                href="https://github.com/fcampoverdeg/reinforcement_learning"
                target="_blank"
                rel="noopener noreferrer"
                className="rl-btn rl-btn-primary"
              >
                <FontAwesomeIcon icon={faGithub} /> View on GitHub
              </a>
            </div>

          </div>
          <div className="rl-hero-image">
            <img src="/images/RL/gridworld_path.png" alt="GridWorld - Agent finding optimal path" />
          </div>
        </div>

        {/* ========== OVERVIEW ========== */}
        <div className="rl-section rl-reveal">
          <div className="rl-section-inner">
            <h2 className="rl-section-title">Overview</h2>
            <p className="rl-section-text">
              Imagine dropping a robot into a maze it has never seen before. It
              doesn't have a map, it doesn't know which paths lead to dead ends,
              and it has to figure everything out by trial and error. That's
              reinforcement learning: an agent learns by interacting with its
              environment, receiving rewards for good decisions and penalties for
              bad ones, gradually building a strategy to reach its goal.
            </p>
            <p className="rl-section-text">
              In this project, the "maze" is a custom GridWorld, a grid filled with
              walls, pits, and wind that randomly pushes the agent off course. Three
              different learning algorithms (Q-Learning, SARSA, and Dyna-Q) are
              trained and compared to answer a key question: which method learns
              the fastest, and which produces the most reliable strategy?
            </p>

            <div className="rl-research-questions">
              <h3 className="rl-subsection-title">Research Questions</h3>
              <ul className="rl-question-list">
                {researchQuestions.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ========== TECH STACK ========== */}
        <div className="rl-section rl-reveal">
          <div className="rl-section-inner">
            <h2 className="rl-section-title">Tech Stack</h2>
            <div className="rl-tech-strip">
              {techStack.map((t, i) => (
                <span key={i} className="rl-tech-chip">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ========== ALGORITHMS ========== */}
        <div className="rl-section rl-reveal">
          <div className="rl-section-inner">
            <h2 className="rl-section-title">Algorithms</h2>
            <div className="rl-algo-grid">
              {algorithms.map((algo, i) => (
                <div key={i} className="rl-algo-card">
                  <span className="rl-algo-type">{algo.type}</span>
                  <h3 className="rl-algo-name">{algo.name}</h3>
                  <p className="rl-algo-desc">{algo.description}</p>
                  <div className="rl-algo-figures">
                    {algo.figures.map((fig, j) => (
                      <img key={j} src={fig} alt={`${algo.name} result ${j + 1}`} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========== COMPARISON RESULTS ========== */}
        <div className="rl-section rl-section-wide rl-reveal">
          <div className="rl-section-inner">
            <h2 className="rl-section-title">Comparison Results</h2>
            <p className="rl-section-text">
              Side-by-side evaluation of all three algorithms on identical
              GridWorld configurations, measuring cumulative returns and
              steps-to-goal convergence.
            </p>
            <div className="rl-results-figures">
              <img
                src="/images/RL/figs/comparison/comparison_return.png"
                alt="Comparison returns"
              />
              <img
                src="/images/RL/figs/comparison/comparison_steps.png"
                alt="Comparison steps"
              />
            </div>
          </div>
        </div>

        {/* ========== K-SWEEP ========== */}
        <div className="rl-section rl-reveal">
          <div className="rl-section-inner">
            <h2 className="rl-section-title">Planning Sweep (K-Sweep)</h2>
            <p className="rl-section-text">
              Analysis of how varying Dyna-Q planning steps K affects learning
              speed and stability. More planning steps dramatically improve
              sample efficiency.
            </p>
            <div className="rl-results-figures">
              <img
                src="/images/RL/figs/k_sweeping/ksweep_return.png"
                alt="K-sweep returns"
              />
              <img
                src="/images/RL/figs/k_sweeping/ksweep_steps.png"
                alt="K-sweep steps"
              />
            </div>
          </div>
        </div>

        {/* ========== ROBUSTNESS ========== */}
        <div className="rl-section rl-reveal">
          <div className="rl-section-inner">
            <h2 className="rl-section-title">Robustness Analysis</h2>
            <p className="rl-section-text">
              Testing policy stability across different seeds, layout variations,
              and wind noise levels.
            </p>
            <div className="rl-robustness-grid">
              <div className="rl-robustness-group">
                <h3 className="rl-subsection-title">Layout Variations</h3>
                <div className="rl-results-figures rl-results-3">
                  <img src="/images/RL/figs/robustness/layout/layout_returns.png" alt="Layout returns" />
                  <img src="/images/RL/figs/robustness/layout/layout_steps.png" alt="Layout steps" />
                  <img src="/images/RL/figs/robustness/layout/layout_seed_stability.png" alt="Layout seed stability" />
                </div>
              </div>
              <div className="rl-robustness-group">
                <h3 className="rl-subsection-title">Windy Environment</h3>
                <div className="rl-results-figures rl-results-3">
                  <img src="/images/RL/figs/robustness/windy/windy_returns.png" alt="Windy returns" />
                  <img src="/images/RL/figs/robustness/windy/windy_steps.png" alt="Windy steps" />
                  <img src="/images/RL/figs/robustness/windy/windy_seed_stability.png" alt="Windy seed stability" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========== NOTEBOOK ========== */}
        <div className="rl-section rl-section-wide rl-reveal">
          <div className="rl-section-inner">
            <h2 className="rl-section-title">Notebook</h2>
            <p className="rl-section-text">
              Explore the full analysis pipeline. All 8 notebooks rendered
              directly, from environment setup through final results.
            </p>
            <NotebookViewer />
          </div>
        </div>

        {/* ========== PROJECT STRUCTURE ========== */}
        <div className="rl-section rl-reveal">
          <div className="rl-section-inner">
            <h2 className="rl-section-title">Project Structure</h2>
            <div className="rl-tree">
              <pre className="rl-tree-code">{`reinforcement_learning/
├── src/rl_capstone/
│   ├── gridworld.py        # Environment implementation
│   ├── rl_algorithms.py    # Q-Learning, SARSA, Dyna-Q
│   ├── utils.py            # Action selection, plotting, evaluation
│   └── __init__.py
├── notebooks/
│   ├── 01_q_learning.ipynb
│   ├── 02_sarsa.ipynb
│   ├── 03_dyna_q.ipynb
│   ├── 04_comparison_models.ipynb
│   ├── 05_k_sweep.ipynb
│   ├── 06_robustness.ipynb
│   └── 07_results.ipynb
├── tests/
│   ├── test_gridworld.py
│   ├── test_rl_algorithms.py
│   └── test_utils.py
├── data/                   # Saved Q-tables and experiment data
├── reports/figs/           # Result visualizations
└── requirements.txt`}</pre>
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

export default ReinforcementLearningPage;
