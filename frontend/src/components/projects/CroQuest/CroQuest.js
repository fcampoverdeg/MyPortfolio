import React from "react";
import "./CroQuest.css";
import CroQuestGallery from "./CroQuestGallery";
import CroQuestModelViewer from "./CroQuestModel";
import CroQuestCode from "./CroQuestCode";

const CroQuestPage = () => {
  return (
    <div className="croquest-page">
      {/* ---------- HERO ---------- */}
      <div className="hero">
        <h1 className="title">CroQuest</h1>
        <p className="subtitle">
          A custom-built ESP32 gaming console with multiplayer Bluetooth support
        </p>
      </div>

      {/* ---------- OVERVIEW SPLIT ---------- */}
      <div className="overview-split">
        <div className="overview-left">
          <h2>Project Overview</h2>
          <p>
            CroQuest is a GameBoy-style handheld console featuring an ESP32,
            8-bit parallel screen, speaker system, SD card access, and
            Bluetooth. It was built from scratch, including all firmware, 3D
            modeling, and physical design.
          </p>
        </div>
        <div className="overview-right">
          <ul className="tags">
            <li>ESP32</li>
            <li>C++</li>
            <li>Bluetooth</li>
            <li>3D Printing</li>
            <li>Game Design</li>
          </ul>
          <img
            src="/images/CroQuest/cover.jpg"
            alt="CroQuest Console"
            className="overview-image"
          />
        </div>
      </div>

      {/* ---------- GALLERY ---------- */}
      <CroQuestGallery />

      {/* ---------- 3D MODEL FULL WIDTH ---------- */}
      <div>
        <h2 className="model-title">3D Model</h2>
        <CroQuestModelViewer />
      </div>

      {/* ---------- CODE + LESSONS SIDE-BY-SIDE ---------- */}
      <div className="code-lessons">
        <div className="code-side">
          <CroQuestCode />
        </div>
        <div className="lessons-side">
          <h2>Lessons Learned</h2>
          <p>
            This project taught me valuable lessons in embedded systems
            programming, state synchronization over BLE, and the importance of
            aligning physical design with software architecture. It was also my
            first time integrating multiplayer logic with custom Bluetooth
            protocols.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CroQuestPage;
