import React, { useEffect, useState } from "react";
import "./CroQuestGallery.css";

const steps = [
  {
    title: "1. Initial Design and Concept",
    description:
      "CroQuest began as a bold idea to design a fully custom handheld console that captured the spirit of classic gaming while teaching modern embedded systems. Early sketches, breadboard experiments, and circuit prototypes helped shape the vision into a functional foundation for what would become a portable, multiplayer-capable console.",
    media: ["first_steps.jpg", "IMG_0438.mov", "circuits.jpg"],
  },
  {
    title: "2. PCB Design and Assembly",
    description:
      "With the core components defined, we moved to designing a custom PCB tailored for the ESP32 and all critical peripherals: display, audio, buttons, SD card, and power circuitry. This step involved routing complex signal paths, validating power integrity, and soldering the first working prototype. Each layer of the board was tested to ensure stable operation under real-world conditions. The PCB layout and design were led by <strong>Andrew Viola</strong> and <strong>Jonas von Stein</strong>, who ensured the board met both electrical and mechanical constraints.",
    media: [
      "PCB_front.jpg",
      "PCB_back.jpg",
      "final_pcb.jpg",
      "pcbfront.jpg",
      "pcbback.jpg",
      "pacbbackbattery.jpg",
    ],
  },
  {
    title: "3. Enclosure and Assembly",
    description:
      "The CroQuest shell was designed in CAD to house the internal electronics with precision. We 3D-printed and iteratively refined the chassis for button placement, port access, and ergonomic handling. Each component had to fit tightly within the casing, requiring careful alignment and durable mounting for the screen, PCB, and buttons.",
    media: ["chassisback.png", "chassisside.png", "chassis.png"],
  },
  {
    title: "4. UI and Input Design",
    description:
      "We built a minimal yet intuitive user interface to navigate between games and settings. A virtual keypad input system was developed using custom-drawn assets and button polling logic. This interface extended across multiplayer setup screens, settings menus, and game-specific controls, ensuring consistency across the system.",
    media: ["numpad.jpg", "IMG_0647.mov", "menu.jpg"],
  },
  {
    title: "5. Custom Branding",
    description:
      "To give CroQuest a personal identity, we designed a custom logo, color palette, and a set of vinyl stickers for the console’s exterior. These visual elements complemented the retro modern aesthetic and helped distinguish each device during multiplayer sessions. All visual assets used throughout the games, including: icons, sprites, and UI elements. They were designed by <strong>Morgan Weidling</strong>, who led the visual direction of the project as Design Lead.",
    media: ["CroQuest_Logo.jpg", "Stickers.jpg"],
  },
  {
    title: "6. Final Result",
    description:
      "After months of development and testing, CroQuest came to life as a polished and fully functional handheld console. With its responsive controls, smooth graphics, sound effects, and Bluetooth multiplayer, the final product delivered a seamless retro-inspired experience — whether playing solo or competing with friends.",
    media: ["window.jpg", "table.jpg", "lab.jpg"],
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
    }, 15000); // 15 seconds per step

    return () => clearInterval(interval);
  }, [manualOverride]);

  return (
    <div className="carousel-container">
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
          <p
            className="step-description"
            dangerouslySetInnerHTML={{ __html: steps[activeIndex].description }}
          />
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
