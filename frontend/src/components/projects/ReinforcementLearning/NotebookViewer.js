import React, { useState } from "react";
import "./NotebookViewer.css";

const NOTEBOOKS = [
  { file: "00_RL", label: "Overview" },
  { file: "01_q_learning", label: "Q-Learning" },
  { file: "02_sarsa", label: "SARSA" },
  { file: "03_dyna_q", label: "Dyna-Q" },
  { file: "04_comparison_models", label: "Comparison" },
  { file: "05_k_sweep", label: "K-Sweep" },
  { file: "06_robustness", label: "Robustness" },
  { file: "07_results", label: "Results" },
];

const NotebookViewer = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = NOTEBOOKS[activeIdx];

  return (
    <div className="nb-viewer">
      {/* Window chrome */}
      <div className="nb-header">
        <div className="nb-dots">
          <span className="nb-dot nb-dot-red" />
          <span className="nb-dot nb-dot-yellow" />
          <span className="nb-dot nb-dot-green" />
        </div>
        <span className="nb-filename">{active.file}.ipynb</span>
      </div>

      {/* Notebook tabs */}
      <div className="nb-tabs">
        {NOTEBOOKS.map((nb, i) => (
          <button
            key={nb.file}
            className={`nb-tab ${i === activeIdx ? "active" : ""}`}
            onClick={() => setActiveIdx(i)}
          >
            <span className="nb-tab-num">{String(i).padStart(2, "0")}</span>
            {nb.label}
          </button>
        ))}
      </div>

      {/* Notebook iframe */}
      <iframe
        className="nb-iframe"
        src={`/data/${active.file}.html`}
        title={`${active.label} Notebook`}
        key={active.file}
        sandbox="allow-scripts allow-same-origin"
      />

      {/* Prev/Next navigation */}
      <div className="nb-nav">
        <button
          className="nb-nav-btn"
          disabled={activeIdx === 0}
          onClick={() => setActiveIdx(activeIdx - 1)}
        >
          Previous
        </button>
        <span className="nb-nav-info">
          {activeIdx + 1} / {NOTEBOOKS.length}
        </span>
        <button
          className="nb-nav-btn"
          disabled={activeIdx === NOTEBOOKS.length - 1}
          onClick={() => setActiveIdx(activeIdx + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NotebookViewer;
