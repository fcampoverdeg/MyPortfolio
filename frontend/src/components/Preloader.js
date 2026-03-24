import React, { useState, useEffect } from "react";
import "./Preloader.css";

const Preloader = ({ onComplete }) => {
  const [phase, setPhase] = useState("loading"); // loading -> reveal -> exit -> done

  useEffect(() => {
    // Phase 1: FC text and bar animate in (CSS handles this)
    // Phase 2: Content fades/scales up + blurs
    const revealTimer = setTimeout(() => setPhase("reveal"), 1600);
    // Phase 3: Screen splits open — make site visible now
    const exitTimer = setTimeout(() => {
      setPhase("exit");
      onComplete();
    }, 2100);
    // Phase 4: Remove preloader from DOM after split animation
    const doneTimer = setTimeout(() => {
      setPhase("done");
    }, 2800);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div className={`preloader ${phase}`}>
      <div className="preloader-half preloader-top" />
      <div className="preloader-half preloader-bottom" />
      <div className={`preloader-content ${phase}`}>
        <div className="preloader-initials">
          {"FC".split("").map((char, i) => (
            <span key={i} className="preloader-char" style={{ "--ci": i }}>
              {char}
            </span>
          ))}
        </div>
        <div className="preloader-bar">
          <div className="preloader-bar-fill" />
        </div>
        <div className="preloader-tagline">Portfolio</div>
      </div>
    </div>
  );
};

export default Preloader;
