import React, { useEffect, useState } from "react";
import "./CroQuestGallery.css";

const steps = [
  {
    title: "1. Initial Design and Concept",
    description:
      "CroQuest began as a vision to build a GameBoy-style handheld console from scratch...",
    media: ["first_steps.jpg", "lab.jpg"],
  },
  {
    title: "2. PCB Design and Assembly",
    description:
      "We custom-designed the PCB layout to fit the ESP32 and peripherals.",
    media: ["PCB_front.jpg", "PCB_back.jpg", "final_pcb.jpg"],
  },
  {
    title: "3. Enclosure and Assembly",
    description:
      "The 3D-printed shell was carefully modeled and tested for fit and finish.",
    media: ["table.jpg", "window.jpg"],
  },
  {
    title: "4. UI and Input Design",
    description:
      "A minimalist menu system and keypad interface were developed.",
    media: ["menu.jpg", "numpad.jpg"],
  },
  {
    title: "5. Custom Branding",
    description:
      "Stickers and a custom logo were created to personalize CroQuest.",
    media: ["CroQuest_Logo.jpg", "Stickers.jpg"],
  },
  {
    title: "6. Final Result",
    description:
      "The completed CroQuest console is compact, responsive, and ready to play.",
    media: ["CroQuest_Cover.png", "IMG_0647.mov"],
  },
];

const isVideo = (file) =>
  file.toLowerCase().endsWith(".mov") || file.toLowerCase().endsWith(".mp4");

const CroQuestGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [manualOverride, setManualOverride] = useState(false);
  const paddedMedia = [...steps[activeIndex].media];

  // Add empty placeholders until we have 9 items
  while (paddedMedia.length < 9) {
    paddedMedia.push(null);
  }

  // Auto-cycle through steps
  useEffect(() => {
    if (manualOverride) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length);
    }, 10000); // 7 seconds per step

    return () => clearInterval(interval);
  }, [manualOverride]);

  return (
    <div className="carousel-container">
      <h1 className="gallery-main-title">Gallery</h1>
      {/* Vertical tab list */}
      <div className="step-list">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`step-tab ${index === activeIndex ? "active" : ""}`}
            onMouseEnter={() => {
              setActiveIndex(index);
              setManualOverride(true);
            }}
            onMouseLeave={() => {
              setManualOverride(false);
            }}
          />
        ))}
      </div>

      {/* Step content */}
      <div className="gallery-row" key={activeIndex}>
        <div className="gallery-text">
          <h2 className="step-title">{steps[activeIndex].title}</h2>
          <p className="step-description">{steps[activeIndex].description}</p>
        </div>

        <div className="gallery-media-grid">
          {paddedMedia.map((file, idx) =>
            file === null ? (
              <div key={idx} className="media-thumb-wrapper placeholder" />
            ) : (
              <div key={idx} className="media-thumb-wrapper">
                <div className="media-thumb">
                  {isVideo(file) ? (
                    <video
                      src={`/images/CroQuest/${file}`}
                      muted
                      loop
                      autoPlay
                    />
                  ) : (
                    <img src={`/images/CroQuest/${file}`} alt={`step ${idx}`} />
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CroQuestGallery;
