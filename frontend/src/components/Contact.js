import React, { useRef, useEffect, useState } from "react";
import { faEnvelope, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Contact.css";

const Contact = () => {
  const sectionRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  // === Intersection animation === //
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimate(true);
      },
      { threshold: 0.4 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // === Communications === //
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    console.log("Sending data to backend:", data);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();
      console.log("Response status:", response.status);
      console.log("Response body:", result);

      if (response.ok) {
        alert("Message sent successfully!");
        e.target.reset();
      } else {
        alert("Failed to send message.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <section
      className={`contact-section ${animate ? "animate" : ""}`}
      id="contact"
      ref={sectionRef}
    >
      {/* ════════════════════════════════════════════════════════ */}
      {/* CYBERPUNK SCENE — layered parallax masterpiece           */}
      {/* ════════════════════════════════════════════════════════ */}
      <div className="cyber-bg" aria-hidden="true">

        {/* ── Sky: stars + planet + haze ── */}
        <div className="cyber-stars" />
        <div className="cyber-stars cyber-stars-2" />
        <div className="cyber-planet">
          <svg viewBox="0 0 200 200">
            <defs>
              <radialGradient id="planetGlow" cx="35%" cy="35%">
                <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="40%"  stopColor="#bdbdbd" stopOpacity="0.7"  />
                <stop offset="80%"  stopColor="#2a2a2a" stopOpacity="0.4"  />
                <stop offset="100%" stopColor="#000000" stopOpacity="0"    />
              </radialGradient>
              <radialGradient id="planetRim" cx="50%" cy="50%">
                <stop offset="85%"  stopColor="#ffffff" stopOpacity="0" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.25" />
              </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="78" fill="url(#planetGlow)" />
            {/* Craters */}
            <circle cx="78"  cy="80"  r="6" fill="rgba(0,0,0,0.25)" />
            <circle cx="120" cy="95"  r="4" fill="rgba(0,0,0,0.2)" />
            <circle cx="95"  cy="125" r="8" fill="rgba(0,0,0,0.22)" />
            <circle cx="135" cy="135" r="5" fill="rgba(0,0,0,0.2)" />
            <circle cx="65"  cy="115" r="3" fill="rgba(0,0,0,0.18)" />
            {/* Atmospheric rim */}
            <circle cx="100" cy="100" r="80" fill="url(#planetRim)" />
          </svg>
        </div>
        <div className="cyber-haze" />

        {/* ── Drifting fog/clouds ── */}
        <div className="cyber-cloud cyber-cloud-1" />
        <div className="cyber-cloud cyber-cloud-2" />
        <div className="cyber-cloud cyber-cloud-3" />

        {/* ── Far city (lightest, blurriest) ── */}
        <svg className="cyber-city cyber-city-far" viewBox="0 0 3200 200" preserveAspectRatio="none">
          <path d="M0,200 L0,150 L60,150 L60,130 L100,130 L100,160 L160,160 L160,110 L210,110 L210,90 L240,90 L240,140 L300,140 L300,100 L350,100 L350,150 L400,150 L400,80 L450,80 L450,70 L490,70 L490,130 L550,130 L550,110 L610,110 L610,140 L670,140 L670,90 L720,90 L720,120 L780,120 L780,80 L840,80 L840,140 L900,140 L900,100 L960,100 L960,70 L1020,70 L1020,130 L1080,130 L1080,90 L1140,90 L1140,150 L1200,150 L1200,110 L1260,110 L1260,80 L1320,80 L1320,140 L1380,140 L1380,100 L1440,100 L1440,160 L1500,160 L1500,120 L1560,120 L1560,150 L1600,150 L1600,200 Z M1600,200 L1600,150 L1660,150 L1660,130 L1700,130 L1700,160 L1760,160 L1760,110 L1810,110 L1810,90 L1840,90 L1840,140 L1900,140 L1900,100 L1950,100 L1950,150 L2000,150 L2000,80 L2050,80 L2050,70 L2090,70 L2090,130 L2150,130 L2150,110 L2210,110 L2210,140 L2270,140 L2270,90 L2320,90 L2320,120 L2380,120 L2380,80 L2440,80 L2440,140 L2500,140 L2500,100 L2560,100 L2560,70 L2620,70 L2620,130 L2680,130 L2680,90 L2740,90 L2740,150 L2800,150 L2800,110 L2860,110 L2860,80 L2920,80 L2920,140 L2980,140 L2980,100 L3040,100 L3040,160 L3100,160 L3100,120 L3160,120 L3160,150 L3200,150 L3200,200 Z" fill="#1a1a1a" />
        </svg>

        {/* ── Horizon glow line ── */}
        <div className="cyber-horizon" />
        <div className="cyber-horizon-glow" />

        {/* ── Mid city ── */}
        <svg className="cyber-city cyber-city-mid" viewBox="0 0 3200 250" preserveAspectRatio="none">
          <g>
            <path d="M0,250 L0,180 L70,180 L70,150 L130,150 L130,200 L190,200 L190,120 L250,120 L250,90 L300,90 L300,160 L370,160 L370,110 L430,110 L430,180 L490,180 L490,70 L550,70 L550,50 L600,50 L600,150 L670,150 L670,120 L730,120 L730,180 L800,180 L800,90 L860,90 L860,140 L920,140 L920,80 L980,80 L980,160 L1050,160 L1050,110 L1110,110 L1110,60 L1170,60 L1170,150 L1230,150 L1230,100 L1290,100 L1290,180 L1350,180 L1350,130 L1410,130 L1410,80 L1470,80 L1470,160 L1530,160 L1530,110 L1600,110 L1600,250 Z M1600,250 L1600,180 L1670,180 L1670,150 L1730,150 L1730,200 L1790,200 L1790,120 L1850,120 L1850,90 L1900,90 L1900,160 L1970,160 L1970,110 L2030,110 L2030,180 L2090,180 L2090,70 L2150,70 L2150,50 L2200,50 L2200,150 L2270,150 L2270,120 L2330,120 L2330,180 L2400,180 L2400,90 L2460,90 L2460,140 L2520,140 L2520,80 L2580,80 L2580,160 L2650,160 L2650,110 L2710,110 L2710,60 L2770,60 L2770,150 L2830,150 L2830,100 L2890,100 L2890,180 L2950,180 L2950,130 L3010,130 L3010,80 L3070,80 L3070,160 L3130,160 L3130,110 L3200,110 L3200,250 Z" fill="#0d0d0d" />
            <path d="M0,180 L70,180 L70,150 L130,150 L130,200 L190,200 L190,120 L250,120 L250,90 L300,90 L300,160 L370,160 L370,110 L430,110 L430,180 L490,180 L490,70 L550,70 L550,50 L600,50 L600,150 L670,150 L670,120 L730,120 L730,180 L800,180 L800,90 L860,90 L860,140 L920,140 L920,80 L980,80 L980,160 L1050,160 L1050,110 L1110,110 L1110,60 L1170,60 L1170,150 L1230,150 L1230,100 L1290,100 L1290,180 L1350,180 L1350,130 L1410,130 L1410,80 L1470,80 L1470,160 L1530,160 L1530,110 L1600,110 M1600,180 L1670,180 L1670,150 L1730,150 L1730,200 L1790,200 L1790,120 L1850,120 L1850,90 L1900,90 L1900,160 L1970,160 L1970,110 L2030,110 L2030,180 L2090,180 L2090,70 L2150,70 L2150,50 L2200,50 L2200,150 L2270,150 L2270,120 L2330,120 L2330,180 L2400,180 L2400,90 L2460,90 L2460,140 L2520,140 L2520,80 L2580,80 L2580,160 L2650,160 L2650,110 L2710,110 L2710,60 L2770,60 L2770,150 L2830,150 L2830,100 L2890,100 L2890,180 L2950,180 L2950,130 L3010,130 L3010,80 L3070,80 L3070,160 L3130,160 L3130,110 L3200,110" fill="none" stroke="#3a3a3a" strokeWidth="1" />
          </g>
        </svg>

        {/* ── Vertical light beams shooting up from buildings ── */}
        <div className="cyber-beam cyber-beam-1" />
        <div className="cyber-beam cyber-beam-2" />
        <div className="cyber-beam cyber-beam-3" />
        <div className="cyber-beam cyber-beam-4" />

        {/* ── Near city (most detail) ── */}
        <svg className="cyber-city cyber-city-near" viewBox="0 0 3200 300" preserveAspectRatio="none">
          <g>
            {/* Filled silhouettes */}
            <path d="M0,300 L0,220 L70,220 L70,170 L130,170 L130,230 L190,230 L190,140 L260,140 L260,90 L300,90 L300,180 L360,180 L360,110 L430,110 L430,210 L490,210 L490,70 L540,70 L540,40 L590,40 L590,180 L650,180 L650,130 L710,130 L710,200 L770,200 L770,90 L830,90 L830,150 L890,150 L890,80 L950,80 L950,180 L1010,180 L1010,120 L1070,120 L1070,60 L1130,60 L1130,170 L1190,170 L1190,110 L1250,110 L1250,200 L1310,200 L1310,140 L1370,140 L1370,80 L1430,80 L1430,170 L1490,170 L1490,120 L1550,120 L1550,210 L1600,210 L1600,300 Z M1600,300 L1600,220 L1670,220 L1670,170 L1730,170 L1730,230 L1790,230 L1790,140 L1860,140 L1860,90 L1900,90 L1900,180 L1960,180 L1960,110 L2030,110 L2030,210 L2090,210 L2090,70 L2140,70 L2140,40 L2190,40 L2190,180 L2250,180 L2250,130 L2310,130 L2310,200 L2370,200 L2370,90 L2430,90 L2430,150 L2490,150 L2490,80 L2550,80 L2550,180 L2610,180 L2610,120 L2670,120 L2670,60 L2730,60 L2730,170 L2790,170 L2790,110 L2850,110 L2850,200 L2910,200 L2910,140 L2970,140 L2970,80 L3030,80 L3030,170 L3090,170 L3090,120 L3150,120 L3150,210 L3200,210 L3200,300 Z" fill="#040404" />

            {/* Wireframe outline */}
            <path d="M0,220 L70,220 L70,170 L130,170 L130,230 L190,230 L190,140 L260,140 L260,90 L300,90 L300,180 L360,180 L360,110 L430,110 L430,210 L490,210 L490,70 L540,70 L540,40 L590,40 L590,180 L650,180 L650,130 L710,130 L710,200 L770,200 L770,90 L830,90 L830,150 L890,150 L890,80 L950,80 L950,180 L1010,180 L1010,120 L1070,120 L1070,60 L1130,60 L1130,170 L1190,170 L1190,110 L1250,110 L1250,200 L1310,200 L1310,140 L1370,140 L1370,80 L1430,80 L1430,170 L1490,170 L1490,120 L1550,120 L1550,210 L1600,210 M1600,220 L1670,220 L1670,170 L1730,170 L1730,230 L1790,230 L1790,140 L1860,140 L1860,90 L1900,90 L1900,180 L1960,180 L1960,110 L2030,110 L2030,210 L2090,210 L2090,70 L2140,70 L2140,40 L2190,40 L2190,180 L2250,180 L2250,130 L2310,130 L2310,200 L2370,200 L2370,90 L2430,90 L2430,150 L2490,150 L2490,80 L2550,80 L2550,180 L2610,180 L2610,120 L2670,120 L2670,60 L2730,60 L2730,170 L2790,170 L2790,110 L2850,110 L2850,200 L2910,200 L2910,140 L2970,140 L2970,80 L3030,80 L3030,170 L3090,170 L3090,120 L3150,120 L3150,210 L3200,210" fill="none" stroke="#5a5a5a" strokeWidth="1.4" />

            {/* Antennas */}
            <line x1="260"  y1="90"  x2="260"  y2="10"  stroke="#6a6a6a" strokeWidth="1" />
            <line x1="540"  y1="40"  x2="540"  y2="-30" stroke="#6a6a6a" strokeWidth="1" />
            <line x1="1070" y1="60"  x2="1070" y2="-10" stroke="#6a6a6a" strokeWidth="1" />
            <line x1="1860" y1="90"  x2="1860" y2="10"  stroke="#6a6a6a" strokeWidth="1" />
            <line x1="2140" y1="40"  x2="2140" y2="-30" stroke="#6a6a6a" strokeWidth="1" />
            <line x1="2670" y1="60"  x2="2670" y2="-10" stroke="#6a6a6a" strokeWidth="1" />

            {/* Antenna lights */}
            <circle className="cyber-blink"          cx="540"  cy="-30" r="2.5" fill="#ffffff" />
            <circle className="cyber-blink delay-1"  cx="2140" cy="-30" r="2.5" fill="#ffffff" />
            <circle className="cyber-blink delay-2"  cx="1070" cy="-10" r="2.5" fill="#ffffff" />
            <circle className="cyber-blink delay-3"  cx="2670" cy="-10" r="2.5" fill="#ffffff" />
            <circle className="cyber-blink delay-4"  cx="260"  cy="10"  r="2.5" fill="#ffffff" />
            <circle className="cyber-blink delay-5"  cx="1860" cy="10"  r="2.5" fill="#ffffff" />

            {/* Windows */}
            <g fill="#7a7a7a">
              <rect x="80"   y="180" width="3" height="3" /><rect x="90"  y="190" width="3" height="3" /><rect x="100" y="180" width="3" height="3" />
              <rect x="140"  y="200" width="3" height="3" /><rect x="150" y="190" width="3" height="3" />
              <rect x="200"  y="160" width="3" height="3" /><rect x="210" y="170" width="3" height="3" /><rect x="220" y="180" width="3" height="3" />
              <rect x="270"  y="120" width="3" height="3" /><rect x="280" y="130" width="3" height="3" /><rect x="270" y="140" width="3" height="3" />
              <rect x="370"  y="140" width="3" height="3" /><rect x="380" y="150" width="3" height="3" />
              <rect x="440"  y="170" width="3" height="3" /><rect x="450" y="180" width="3" height="3" />
              <rect x="500"  y="100" width="3" height="3" /><rect x="510" y="110" width="3" height="3" /><rect x="500" y="130" width="3" height="3" /><rect x="510" y="150" width="3" height="3" />
              <rect x="550"  y="80"  width="3" height="3" /><rect x="560" y="90"  width="3" height="3" /><rect x="550" y="110" width="3" height="3" />
              <rect x="600"  y="120" width="3" height="3" /><rect x="610" y="140" width="3" height="3" />
              <rect x="660"  y="160" width="3" height="3" /><rect x="670" y="170" width="3" height="3" />
              <rect x="720"  y="150" width="3" height="3" /><rect x="730" y="170" width="3" height="3" />
              <rect x="780"  y="120" width="3" height="3" /><rect x="790" y="140" width="3" height="3" /><rect x="780" y="160" width="3" height="3" />
              <rect x="840"  y="170" width="3" height="3" /><rect x="850" y="180" width="3" height="3" />
              <rect x="900"  y="110" width="3" height="3" /><rect x="910" y="130" width="3" height="3" /><rect x="900" y="150" width="3" height="3" />
              <rect x="960"  y="140" width="3" height="3" /><rect x="970" y="160" width="3" height="3" />
              <rect x="1020" y="150" width="3" height="3" /><rect x="1030" y="170" width="3" height="3" />
              <rect x="1080" y="90"  width="3" height="3" /><rect x="1090" y="110" width="3" height="3" /><rect x="1080" y="130" width="3" height="3" />
              <rect x="1140" y="140" width="3" height="3" /><rect x="1150" y="160" width="3" height="3" />
              <rect x="1200" y="130" width="3" height="3" /><rect x="1210" y="150" width="3" height="3" />
              <rect x="1260" y="160" width="3" height="3" /><rect x="1270" y="180" width="3" height="3" />
              <rect x="1320" y="170" width="3" height="3" /><rect x="1330" y="190" width="3" height="3" />
              <rect x="1380" y="120" width="3" height="3" /><rect x="1390" y="140" width="3" height="3" />
              <rect x="1440" y="140" width="3" height="3" /><rect x="1450" y="160" width="3" height="3" />
              <rect x="1500" y="170" width="3" height="3" />
              <rect x="1680" y="180" width="3" height="3" /><rect x="1690" y="190" width="3" height="3" /><rect x="1700" y="180" width="3" height="3" />
              <rect x="1740" y="200" width="3" height="3" /><rect x="1750" y="190" width="3" height="3" />
              <rect x="1800" y="160" width="3" height="3" /><rect x="1810" y="170" width="3" height="3" /><rect x="1820" y="180" width="3" height="3" />
              <rect x="1870" y="120" width="3" height="3" /><rect x="1880" y="130" width="3" height="3" /><rect x="1870" y="140" width="3" height="3" />
              <rect x="1970" y="140" width="3" height="3" /><rect x="1980" y="150" width="3" height="3" />
              <rect x="2040" y="170" width="3" height="3" /><rect x="2050" y="180" width="3" height="3" />
              <rect x="2100" y="100" width="3" height="3" /><rect x="2110" y="110" width="3" height="3" /><rect x="2100" y="130" width="3" height="3" /><rect x="2110" y="150" width="3" height="3" />
              <rect x="2150" y="80"  width="3" height="3" /><rect x="2160" y="90"  width="3" height="3" /><rect x="2150" y="110" width="3" height="3" />
              <rect x="2200" y="120" width="3" height="3" /><rect x="2210" y="140" width="3" height="3" />
              <rect x="2260" y="160" width="3" height="3" /><rect x="2270" y="170" width="3" height="3" />
              <rect x="2320" y="150" width="3" height="3" /><rect x="2330" y="170" width="3" height="3" />
              <rect x="2380" y="120" width="3" height="3" /><rect x="2390" y="140" width="3" height="3" /><rect x="2380" y="160" width="3" height="3" />
              <rect x="2440" y="170" width="3" height="3" /><rect x="2450" y="180" width="3" height="3" />
              <rect x="2500" y="110" width="3" height="3" /><rect x="2510" y="130" width="3" height="3" /><rect x="2500" y="150" width="3" height="3" />
              <rect x="2560" y="140" width="3" height="3" /><rect x="2570" y="160" width="3" height="3" />
              <rect x="2620" y="150" width="3" height="3" /><rect x="2630" y="170" width="3" height="3" />
              <rect x="2680" y="90"  width="3" height="3" /><rect x="2690" y="110" width="3" height="3" /><rect x="2680" y="130" width="3" height="3" />
              <rect x="2740" y="140" width="3" height="3" /><rect x="2750" y="160" width="3" height="3" />
              <rect x="2800" y="130" width="3" height="3" /><rect x="2810" y="150" width="3" height="3" />
              <rect x="2860" y="160" width="3" height="3" /><rect x="2870" y="180" width="3" height="3" />
              <rect x="2920" y="170" width="3" height="3" /><rect x="2930" y="190" width="3" height="3" />
              <rect x="2980" y="120" width="3" height="3" /><rect x="2990" y="140" width="3" height="3" />
              <rect x="3040" y="140" width="3" height="3" /><rect x="3050" y="160" width="3" height="3" />
              <rect x="3100" y="170" width="3" height="3" />
            </g>
          </g>
        </svg>

        {/* ── Tron-style perspective floor grid ── */}
        <div className="cyber-floor">
          <div className="cyber-floor-grid" />
        </div>

        {/* ── Drifting particles / dust motes ── */}
        <div className="cyber-particles">
          {Array.from({ length: 18 }).map((_, i) => (
            <span key={i} className={`cyber-particle p-${i}`} />
          ))}
        </div>

        {/* ── Radar sweep ── */}
        <div className="cyber-radar">
          <div className="cyber-radar-sweep" />
        </div>

        {/* ── HUD overlays ── */}
        <div className="cyber-hud">
          <span className="cyber-hud-corner tl" />
          <span className="cyber-hud-corner tr" />
          <span className="cyber-hud-corner bl" />
          <span className="cyber-hud-corner br" />
        </div>

        {/* ── CRT scanlines + vignette ── */}
        <div className="cyber-scanlines" />
        <div className="cyber-vignette" />
      </div>

      <div className="vanta-container">
        <div className="contact-inner">
          <h1 className="contact-title">Let's Connect</h1>
          <div className="contact-wrapper">
            {/* === Left: Fancy Contact Form === */}
            <div className="contact-card">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input type="text" name="name" required />
                  <label>Your Name</label>
                </div>
                <div className="form-group">
                  <input type="email" name="email" required />
                  <label>Your Email</label>
                </div>
                <div className="form-group">
                  <textarea name="message" required rows="5"></textarea>
                  <label>Your Message</label>
                </div>
                <button type="submit">Send</button>
              </form>
            </div>

            {/* === Right: Info Panel === */}
            <div className="contact-card info-card">
              <p>
                <FontAwesomeIcon icon={faEnvelope} /> fcampoverdeg@vt.edu
              </p>
              <p>
                <FontAwesomeIcon icon={faEnvelope} /> fcampoverdeg@gmail.com
              </p>
              <p>
                <FontAwesomeIcon icon={faPhoneAlt} /> +1 (804) 356-5749
              </p>

              <div className="map-container">
                <iframe
                  title="San Francisco, CA"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d70136.34707211575!2d-122.44828245477996!3d37.73963365023949!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e1!3m2!1sen!2sus!4v1775716589557!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: "12px" }}
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <p>
                <em className="end-phrase">
                  If you've made it this far... you're awesome. Let's talk.
                </em>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
