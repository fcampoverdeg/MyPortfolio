import React from "react";
import "./CroQuest.css";
import CroQuestGallery from "./CroQuestGallery";
import CroQuestModelViewer from "./CroQuestModel";
import CroQuestCode from "./CroQuestCode";

import Footer from "../../Footer";

const CroQuestPage = () => {
  return (
    <>
      <div className="croquest-page">
        {/* ---------- HERO ---------- */}
        <div className="hero">
          <h1 className="title">CroQuest</h1>
          <p className="subtitle">
            A custom-built ESP32 gaming console with multiplayer Bluetooth
            support
          </p>
        </div>

        {/* ---------- OVERVIEW SPLIT ---------- */}
        <div className="overview-container">
          <div className="overview-left">
            <img
              src="/images/CroQuest/CroQuest_Cover.png"
              alt="CroQuest Console"
              className="overview-image"
            />
          </div>

          <div className="overview-right">
            <h2 className="overview-title">What is CroQuest?</h2>

            <p className="overview-description">
              <strong>CroQuest</strong> is a custom-built handheld console
              powered by an ESP32, featuring an 8-bit parallel TFT screen, SD
              card storage, audio output, and Bluetooth multiplayer. The entire
              system: hardware, firmware, and enclosure was developed from
              scratch and includes a modular game engine, custom UI, badge
              unlock system, and a library of games like Snake, Tic Tac Toe,
              Simon, Pong, and Tetris. All with built-in BLE multiplayer
              support.
            </p>

            <p className="overview-role">
              <strong>My Role:</strong>{" "}
              <role>Chief Engineer & Software Lead</role>. I designed the system
              architecture, developed the full firmware stack, and built the
              Bluetooth multiplayer and game engine frameworks.
            </p>

            <p className="overview-credit">
              <em>
                Project concept and visual design led by{" "}
                <strong>Marco Gonzales Hauger</strong>, who served as Chief
                Designer and originated the CroQuest idea.
              </em>
            </p>

            <div className="overview-video">
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/Fxc-An2Zm-w"
                title="CroQuest Demo Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        {/* ---------- GALLERY ---------- */}
        <div className="gallery-section">
          <h2 className="gallery-main-title">Gallery</h2>
          <p className="gallery-description">
            The gallery showcases the development journey of{" "}
            <strong>CroQuest</strong> — from early prototypes to the final
            console in action. You'll see detailed shots of the internal
            hardware, button layouts, custom PCBs, game screens, and the final
            assembled unit.
          </p>
          <p className="gallery-description">
            This visual archive captures the technical evolution, creative
            design process, and hands-on assembly that brought the console to
            life.
          </p>
          <CroQuestGallery />
        </div>

        {/* ---------- 3D MODEL FULL WIDTH ---------- */}
        <div className="model-section">
          <h2 className="model-title">3D Model</h2>
          <p className="model-description">
            This interactive 3D viewer lets you explore the physical shell of
            the CroQuest console, including its button layout, screen cutout,
            and overall ergonomic design. You can rotate, zoom, and inspect the
            model from any angle to get a detailed sense of the form factor.
          </p>
          <p className="model-credit">
            Shell design by <strong>Steve Kitomary</strong>, who led the 3D
            modeling and mechanical layout of the CroQuest enclosure.
          </p>
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
              aligning physical design with software architecture. It was also
              my first time integrating multiplayer logic with custom Bluetooth
              protocols.
            </p>
          </div>
        </div>
      </div>
      {/* Footer */}
      <section id="footer" className="footer-section">
        <Footer />
      </section>
    </>
  );
};

export default CroQuestPage;
