import React, { useEffect, useState, useCallback } from "react";
import "./CroQuestGallery.css";

const steps = [
  {
    title: "Initial Design and Concept",
    description:
      '<span class="cq-brand">CroQuest</span> began as a bold idea to design a fully custom handheld console that captured the spirit of classic gaming while teaching modern embedded systems. Early sketches, breadboard experiments, and circuit prototypes helped shape the vision into a functional foundation.',
    media: ["first_steps.jpg", "IMG_0438.mov", "circuits.jpg"],
  },
  {
    title: "PCB Design and Assembly",
    description:
      'Custom PCB tailored for the ESP32 and all critical peripherals: display, audio, buttons, SD card, and power circuitry. Layout and design led by <strong>Andrew Viola</strong> and <strong>Jonas von Stein</strong>.',
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
    title: "Enclosure and Assembly",
    description:
      "The shell was designed in CAD to house the internal electronics with precision. We 3D-printed and iteratively refined the chassis for button placement, port access, and ergonomic handling.",
    media: ["chassisback.png", "chassisside.png", "chassis.png"],
  },
  {
    title: "UI and Input Design",
    description:
      "Minimal yet intuitive user interface to navigate between games and settings. A virtual keypad input system was developed using custom-drawn assets and button polling logic.",
    media: ["numpad.jpg", "IMG_0647.mov", "menu.jpg"],
  },
  {
    title: "Custom Branding",
    description:
      'Custom logo, color palette, and vinyl stickers to give <span class="cq-brand">CroQuest</span> a personal identity. All visual assets designed by <strong>Morgan Weidling</strong>, Design Lead.',
    media: ["CroQuest_Logo.jpg", "Stickers.jpg"],
  },
  {
    title: "Final Result",
    description:
      'After months of development, <span class="cq-brand">CroQuest</span> came to life as a polished handheld console. Responsive controls, smooth graphics, sound effects, and Bluetooth multiplayer delivered a seamless retro-inspired experience.',
    media: ["window.jpg", "table.jpg", "lab.jpg"],
  },
];

const isVideo = (file) =>
  file.toLowerCase().endsWith(".mov") || file.toLowerCase().endsWith(".mp4");

const CroQuestGallery = () => {
  const [stepIdx, setStepIdx] = useState(0);
  const [mediaIdx, setMediaIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const resumeTimer = React.useRef(null);

  const step = steps[stepIdx];
  const featured = step.media[mediaIdx] || step.media[0];

  const goToStep = useCallback((i) => {
    setStepIdx(i);
    setMediaIdx(0);
    setPaused(true);
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), 2000);
  }, []);

  // Auto-advance images within a step, then advance to next step
  useEffect(() => {
    if (paused) return;
    const timeout = setTimeout(() => {
      const currentStep = steps[stepIdx];
      if (mediaIdx + 1 < currentStep.media.length) {
        setMediaIdx(mediaIdx + 1);
      } else {
        setStepIdx((stepIdx + 1) % steps.length);
        setMediaIdx(0);
      }
    }, 4000);
    return () => clearTimeout(timeout);
  }, [paused, stepIdx, mediaIdx]);

  return (
    <div className="cqg">
      {/* ── Hero showcase ── */}
      <div className="cqg-hero">
        {/* Step number watermark */}
        <span className="cqg-watermark" key={`wm-${stepIdx}`}>{String(stepIdx + 1).padStart(2, "0")}</span>

        {/* Featured media (only this re-animates on image change) */}
        <div className="cqg-featured" key={`${stepIdx}-${mediaIdx}`}>
          {isVideo(featured) ? (
            <video src={`/images/CroQuest/${featured}`} muted loop autoPlay playsInline />
          ) : (
            <img src={`/images/CroQuest/${featured}`} alt={step.title} />
          )}
        </div>

        {/* Overlay info (only re-animates on step change) */}
        <div className="cqg-overlay" key={`text-${stepIdx}`}>
          <h3 className="cqg-title">{step.title}</h3>
          <p className="cqg-desc" dangerouslySetInnerHTML={{ __html: step.description }} />
        </div>
      </div>

      {/* ── Filmstrip thumbnails ── */}
      <div className="cqg-filmstrip">
        {step.media.map((file, i) => (
          <div
            key={i}
            className={`cqg-thumb ${i === mediaIdx ? "active" : ""}`}
            onClick={() => {
              setMediaIdx(i);
              setPaused(true);
              clearTimeout(resumeTimer.current);
              resumeTimer.current = setTimeout(() => setPaused(false), 2000);
            }}
          >
            {isVideo(file) ? (
              <video src={`/images/CroQuest/${file}`} muted />
            ) : (
              <img src={`/images/CroQuest/${file}`} alt={`Thumb ${i + 1}`} />
            )}
          </div>
        ))}
      </div>

      {/* ── Step navigation dots ── */}
      <div className="cqg-steps">
        {steps.map((s, i) => (
          <button
            key={i}
            className={`cqg-step-btn ${i === stepIdx ? "active" : ""}`}
            onClick={() => goToStep(i)}
          >
            <span className="cqg-step-num">{String(i + 1).padStart(2, "0")}</span>
            <span className="cqg-step-label">{s.title}</span>
            {i === stepIdx && !paused && <span className="cqg-step-progress" />}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CroQuestGallery;
