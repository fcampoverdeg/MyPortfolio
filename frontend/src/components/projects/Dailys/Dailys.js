import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../Footer";
import "./Dailys.css";

const techStack = [
  "ROS 2", "Python", "C++", "PyTorch", "LeRobot", "Docker",
  "NVIDIA Jetson", "Isaac Sim", "CAN Bus", "PyBullet",
  "Meta Quest 3", "OpenArm", "RP2350", "Raspberry Pi",
];

const vlaModels = [
  { name: "ACT", desc: "Action Chunking with Transformers. Baseline imitation learning policy for bimanual manipulation tasks." },
  { name: "SmolVLA", desc: "Lightweight vision-language-action model. Efficient enough for edge deployment on Jetson hardware." },
  { name: "π0", desc: "Physical Intelligence's foundation model for robotic manipulation. Zero-shot generalization capabilities." },
  { name: "π0-FAST", desc: "Optimized variant with Real-Time Chunking for roughly 2x inference speedup during deployment." },
  { name: "π0.5 (4B)", desc: "4 billion parameter model. The largest VLA evaluated, pushing the limits of edge inference on Jetson Thor." },
];

const safetyLayers = [
  { name: "E-Stop", desc: "Hardware emergency stop kills power to all motors instantly" },
  { name: "Hardware Limits", desc: "Joint angle and velocity limits enforced at the motor driver level" },
  { name: "Per-Cycle Delta Guards", desc: "Maximum position change per control cycle prevents sudden jerks" },
  { name: "Collision Avoidance", desc: "Real-time self-collision and workspace boundary checking" },
  { name: "Temperature Monitoring", desc: "Motor and driver temperature limits with automatic shutdown" },
  { name: "Software Watchdog", desc: "Heartbeat monitoring across all nodes with fail-safe on timeout" },
];

const gallerySteps = [
  {
    title: "Early Development (P630)",
    description: "The first robot platform: a single-arm P630 used for initial development of the control loop, VR teleoperation, and the imitation learning pipeline.",
    media: [
      { src: "/images/dailys/early.jpeg", type: "img" },
      { src: "/images/dailys/early2.mp4", type: "video" },
      { src: "/images/dailys/early3.jpeg", type: "img" },
      { src: "/images/dailys/early4.jpeg", type: "img" },
      { src: "/images/dailys/early5.jpeg", type: "img" },
      { src: "/images/dailys/early_vla.mp4", type: "video" },
    ],
  },
  {
    title: "OpenArm Robot",
    description: "The bimanual OpenArm with dual 7-DOF arms (14 DOF total), Damiao motors, wrist cameras, and custom grippers for food manipulation.",
    media: [
      { src: "/images/dailys/openarm.jpeg", type: "img" },
      { src: "/images/dailys/camera.jpeg", type: "img" },
    ],
  },
  {
    title: "Kitchen Cell",
    description: "The autonomous kitchen with integrated fridge, oven, and warmer. The robot retrieves ingredients, cooks, and assembles bowls for delivery.",
    media: [
      { src: "/images/dailys/openarm_kitchen.jpeg", type: "img" },
      { src: "/images/dailys/openarm_kitchen_setup.jpeg", type: "img" },
      { src: "/images/dailys/dashboard.jpeg", type: "img" },
    ],
  },
  {
    title: "VLA Training Trials",
    description: "Vision-language-action model trials using ACT, SmolVLA, and π0 variants. Includes fridge pick, oven interaction, and lid removal tasks with Real-Time Chunking (RTC).",
    media: [
      { src: "/images/dailys/vla_pick_fridge_cool.mp4", type: "video" },
      { src: "/images/dailys/vla_pick_fridge.mp4", type: "video" },
      { src: "/images/dailys/vla_fridge.mp4", type: "video" },
      { src: "/images/dailys/vla_oven.mp4", type: "video" },
      { src: "/images/dailys/vla_lid_remover.mp4", type: "video" },
      { src: "/images/dailys/vla_lid_remover_better.mp4", type: "video" },
      { src: "/images/dailys/vla_lid_remover__RTC.mp4", type: "video" },
    ],
  },
  {
    title: "Hardcoded Demos",
    description: "Final working demos using deterministic trajectory replay. Motions recorded via VR teleoperation, then replayed precisely by the robot for reliable end-to-end food preparation.",
    media: [
      { src: "/images/dailys/1st_demo.mp4", type: "video" },
      { src: "/images/dailys/2nd_demo.mp4", type: "video" },
      { src: "/images/dailys/3rd_demo.mp4", type: "video" },
    ],
  },
  {
    title: "Edge Hardware",
    description: "NVIDIA Jetson Thor running the full stack: model inference, robot control, perception, and coordination of RP2350 Picos and Raspberry Pi.",
    media: [
      { src: "/images/dailys/thor.jpeg", type: "img" },
      { src: "/images/dailys/jetson_nano.jpeg", type: "img" },
    ],
  },
];

const DailysGallery = () => {
  const [stepIdx, setStepIdx] = useState(0);
  const [mediaIdx, setMediaIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const resumeTimer = React.useRef(null);
  const videoRef = React.useRef(null);

  const step = gallerySteps[stepIdx];
  const featured = step.media[mediaIdx];

  const advance = useCallback(() => {
    const currentStep = gallerySteps[stepIdx];
    if (mediaIdx + 1 < currentStep.media.length) {
      setMediaIdx(mediaIdx + 1);
    } else {
      setStepIdx((stepIdx + 1) % gallerySteps.length);
      setMediaIdx(0);
    }
  }, [stepIdx, mediaIdx]);

  const goToStep = useCallback((i) => {
    setStepIdx(i);
    setMediaIdx(0);
    setPaused(true);
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), 2000);
  }, []);

  useEffect(() => {
    if (paused) return;

    if (featured.type === "video") {
      const video = videoRef.current;
      if (!video) return;
      video.loop = false;
      const onEnded = () => advance();
      video.addEventListener("ended", onEnded);
      return () => video.removeEventListener("ended", onEnded);
    }

    const timeout = setTimeout(advance, 4000);
    return () => clearTimeout(timeout);
  }, [paused, stepIdx, mediaIdx, featured.type, advance]);

  return (
    <div className="dy-gallery">
      <div className="dy-gal-hero">
        <span className="dy-gal-watermark">{String(stepIdx + 1).padStart(2, "0")}</span>
        <div className="dy-gal-featured" key={`${stepIdx}-${mediaIdx}`}>
          {featured.type === "video" ? (
            <video ref={videoRef} src={featured.src} muted autoPlay playsInline />
          ) : (
            <img src={featured.src} alt={step.title} />
          )}
        </div>
        <div className="dy-gal-overlay" key={`text-${stepIdx}`}>
          <h3 className="dy-gal-title">{step.title}</h3>
          <p className="dy-gal-desc">{step.description}</p>
        </div>
      </div>

      <div className="dy-gal-filmstrip">
        {step.media.map((m, i) => (
          <div
            key={i}
            className={`dy-gal-thumb ${i === mediaIdx ? "active" : ""}`}
            onClick={() => {
              setMediaIdx(i);
              setPaused(true);
              clearTimeout(resumeTimer.current);
              resumeTimer.current = setTimeout(() => setPaused(false), 2000);
            }}
          >
            {m.type === "video" ? (
              <video src={m.src} muted />
            ) : (
              <img src={m.src} alt={`Thumb ${i + 1}`} />
            )}
          </div>
        ))}
      </div>

      <div className="dy-gal-steps">
        {gallerySteps.map((s, i) => (
          <button
            key={i}
            className={`dy-gal-step-btn ${i === stepIdx ? "active" : ""}`}
            onClick={() => goToStep(i)}
          >
            <span className="dy-gal-step-num">{String(i + 1).padStart(2, "0")}</span>
            <span className="dy-gal-step-label">{s.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const DailysPage = () => {
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
    const reveals = document.querySelectorAll(".dy-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("dy-visible");
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => reveals.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <>
      <div id="dailys-top" className="dy-page">
        {/* ========== HERO ========== */}
        <div className="dy-hero">
          <div className="dy-hero-content">
            <Link to="/portfolio" className="dy-back-btn">
              <FontAwesomeIcon icon={faArrowLeft} /> Back to Portfolio
            </Link>
            <img src="/images/dailys/dailys_banner.svg" alt="Daily's" className="dy-hero-title-banner" />
            <p className="dy-hero-label">Founding Engineer &middot; Dec 2025 &ndash; June 2026 &middot; San Francisco</p>
            <p className="dy-hero-subtitle">
              Built the full robotics software and learning stack for an autonomous
              kitchen cell. A bimanual OpenArm robot (dual 7-DOF arms, 14 DOF total)
              that retrieves, cooks, and assembles food bowls across an integrated
              oven, warmer, and fridge.
            </p>
          </div>
          <div className="dy-hero-image">
            <img src="/images/dailys/openarm_kitchen.jpeg" alt="OpenArm Bimanual Robot - Kitchen Cell" />
          </div>
        </div>

        {/* ========== OVERVIEW ========== */}
        <div className="dy-section dy-reveal">
          <div className="dy-section-inner">
            <h2 className="dy-section-title">Overview</h2>
            <p className="dy-section-text">
              Imagine a kitchen that cooks for you. Not a vending machine, not
              pre-packaged meals, but a real robot with two arms that opens the
              fridge, grabs ingredients, places them in the oven, assembles a bowl,
              and hands it off for delivery. That's what we built at Daily's.
            </p>
            <p className="dy-section-text">
              As founding engineer, I built the entire software stack from scratch:
              the real-time motor control, the imitation learning pipeline, the VLA
              model training infrastructure, the edge deployment system, and the
              safety architecture. The robot runs on ROS 2 with a 500 Hz C++ control
              loop driving 14 motors over CAN bus, while a separate inference pipeline
              runs vision-language-action models for autonomous manipulation.
            </p>
          </div>
        </div>

        {/* ========== TECH STACK ========== */}
        <div className="dy-section dy-reveal">
          <div className="dy-section-inner">
            <h2 className="dy-section-title">Tech Stack</h2>
            <div className="dy-tech-strip">
              {techStack.map((t, i) => (
                <span key={i} className="dy-tech-chip">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ========== GALLERY ========== */}
        <div className="dy-section dy-section-wide dy-reveal">
          <div className="dy-section-inner">
            <h2 className="dy-section-title">Gallery</h2>
            <DailysGallery />
          </div>
        </div>

        {/* ========== SYSTEM ARCHITECTURE ========== */}
        <div className="dy-section dy-section-wide dy-reveal">
          <div className="dy-section-inner">
            <h2 className="dy-section-title">System Architecture</h2>
            <div className="dy-arch">
              <h3 className="dy-arch-section-title">Data Collection &amp; Fine-tuning VLA / Training</h3>
              <div className="dy-arch-row">
                <div className="dy-arch-node">
                  <span className="dy-arch-label">VR Teleop</span>
                  <span className="dy-arch-detail">Quest 3 / ADB</span>
                </div>
                <div className="dy-arch-arrow" />
                <div className="dy-arch-node">
                  <span className="dy-arch-label">Data Pipeline</span>
                  <span className="dy-arch-detail">LeRobot Format</span>
                </div>
                <div className="dy-arch-arrow" />
                <div className="dy-arch-node dy-arch-brain">
                  <span className="dy-arch-label">Cloud Training</span>
                  <span className="dy-arch-detail">Modal B200 GPUs</span>
                </div>
                <div className="dy-arch-arrow" />
                <div className="dy-arch-node">
                  <span className="dy-arch-label">Model Deploy</span>
                  <span className="dy-arch-detail">Jetson Thor</span>
                </div>
              </div>

              <h3 className="dy-arch-section-title">Inference</h3>
              <div className="dy-arch-row">
                <div className="dy-arch-node dy-arch-perception">
                  <span className="dy-arch-label">Perception</span>
                  <span className="dy-arch-detail">ZED Stereo + Multi-Camera</span>
                </div>
                <div className="dy-arch-arrow" />
                <div className="dy-arch-node dy-arch-brain">
                  <span className="dy-arch-label">VLA Inference</span>
                  <span className="dy-arch-detail">π0.5 / SmolVLA / ACT</span>
                </div>
                <div className="dy-arch-arrow" />
                <div className="dy-arch-node">
                  <span className="dy-arch-label">IK Solver</span>
                  <span className="dy-arch-detail">PyBullet</span>
                </div>
                <div className="dy-arch-arrow" />
                <div className="dy-arch-node">
                  <span className="dy-arch-label">Control Loop</span>
                  <span className="dy-arch-detail">500 Hz C++</span>
                </div>
                <div className="dy-arch-arrow" />
                <div className="dy-arch-node">
                  <span className="dy-arch-label">CAN Bus</span>
                  <span className="dy-arch-detail">14 Damiao Motors</span>
                </div>
              </div>

              <div className="dy-arch-infra">
                <span className="dy-arch-infra-label">Infrastructure</span>
                <div className="dy-arch-infra-items">
                  <span>Jetson Thor</span>
                  <span>Docker</span>
                  <span>ROS 2 Jazzy</span>
                  <span>RP2350 Picos</span>
                  <span>Raspberry Pi</span>
                  <span>GitHub CI/CD</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========== ROBOT CONTROL ========== */}
        <div className="dy-section dy-reveal">
          <div className="dy-section-inner">
            <h2 className="dy-section-title">Robot Control</h2>
            <p className="dy-section-text">
              The control system runs a 500 Hz real-time C++ loop using ROS 2 and
              ros2_control, driving 14 Damiao motors over CAN bus with gravity
              compensation. The bimanual OpenArm has dual 7-DOF arms giving 14
              degrees of freedom total.
            </p>
            <div className="dy-control-grid">
              <div className="dy-control-card">
                <h3>500 Hz Control Loop</h3>
                <p>Real-time C++ node with deterministic timing, gravity compensation, and trajectory interpolation</p>
              </div>
              <div className="dy-control-card">
                <h3>CAN Bus Communication</h3>
                <p>Direct motor communication at 1 Mbps with position, velocity, and torque feedback per cycle</p>
              </div>
              <div className="dy-control-card">
                <h3>Inverse Kinematics</h3>
                <p>PyBullet-based IK solver for both arms, converting task-space goals to joint-space commands</p>
              </div>
              <div className="dy-control-card">
                <h3>ros2_control</h3>
                <p>Hardware abstraction layer enabling seamless switching between simulation and real hardware</p>
              </div>
            </div>
          </div>
        </div>

        {/* ========== IMITATION LEARNING ========== */}
        <div className="dy-section dy-section-wide dy-reveal">
          <div className="dy-section-inner">
            <h2 className="dy-section-title">Imitation Learning Pipeline</h2>
            <p className="dy-section-text">
              The robot learns by watching a human perform tasks through VR
              teleoperation. Demonstrations are captured, packaged, and used to
              train vision-language-action models that the robot can then execute
              autonomously.
            </p>
            <div className="dy-pipeline">
              <div className="dy-pipe-step">
                <div className="dy-pipe-num">1</div>
                <h3>VR Teleoperation</h3>
                <p>Human demonstrates tasks using Meta Quest 3 controllers, streamed over ADB/TCP to the robot in real-time</p>
              </div>
              <div className="dy-pipe-arrow" />
              <div className="dy-pipe-step">
                <div className="dy-pipe-num">2</div>
                <h3>Data Capture</h3>
                <p>Joint positions, camera frames, and action labels recorded and packaged in LeRobot format</p>
              </div>
              <div className="dy-pipe-arrow" />
              <div className="dy-pipe-step">
                <div className="dy-pipe-num">3</div>
                <h3>Cloud Training</h3>
                <p>VLA models trained on Modal B200 GPUs with parameter sweeps across ACT, SmolVLA, and π0 variants</p>
              </div>
              <div className="dy-pipe-arrow" />
              <div className="dy-pipe-step">
                <div className="dy-pipe-num">4</div>
                <h3>Edge Deployment</h3>
                <p>Trained models deployed to Jetson Thor via Docker with PyTorch inference running alongside the control stack</p>
              </div>
            </div>
          </div>
        </div>

        {/* ========== VLA MODELS ========== */}
        <div className="dy-section dy-reveal">
          <div className="dy-section-inner">
            <h2 className="dy-section-title">VLA Models</h2>
            <p className="dy-section-text">
              Trained and benchmarked multiple vision-language-action policies,
              implementing techniques like Real-Time Chunking (2x inference
              speedup), DAgger, and action smoothing.
            </p>
            <div className="dy-vla-grid">
              {vlaModels.map((m, i) => (
                <div key={i} className="dy-vla-card">
                  <h3 className="dy-vla-name">{m.name}</h3>
                  <p className="dy-vla-desc">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========== SAFETY ========== */}
        <div className="dy-section dy-reveal">
          <div className="dy-section-inner">
            <h2 className="dy-section-title">6-Layer Safety System</h2>
            <p className="dy-section-text">
              When a robot with two arms is handling food around hot surfaces,
              safety isn't optional. The system implements six independent
              layers of protection.
            </p>
            <div className="dy-safety-stack">
              {safetyLayers.map((s, i) => (
                <div key={i} className="dy-safety-layer">
                  <span className="dy-safety-num">{i + 1}</span>
                  <div className="dy-safety-content">
                    <h3>{s.name}</h3>
                    <p>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========== EDGE STACK ========== */}
        <div className="dy-section dy-reveal">
          <div className="dy-section-inner">
            <h2 className="dy-section-title">Edge Deployment</h2>
            <p className="dy-section-text">
              The full stack runs on an NVIDIA Jetson Thor, containerized with
              Docker for one-step deployment. Two images split the workload:
              one for teleoperation and dashboard, one for autonomous operation.
            </p>
            <div className="dy-edge-grid">
              <div className="dy-edge-card">
                <code>teleop-stack</code>
                <p>VR controller streaming, real-time visualization dashboard, demonstration recording</p>
              </div>
              <div className="dy-edge-card">
                <code>deploy-stack</code>
                <p>Model inference, robot control, perception pipeline, safety monitoring, ROS 2 orchestration</p>
              </div>
            </div>
            <div className="dy-edge-infra">
              <span>Jetson Thor</span> <span>·</span>
              <span>Docker</span> <span>·</span>
              <span>GitHub CI/CD</span> <span>·</span>
              <span>RP2350 Picos</span> <span>·</span>
              <span>Raspberry Pi</span>
            </div>
          </div>
        </div>

        {/* ========== OUTCOME ========== */}
        <div className="dy-section dy-reveal">
          <div className="dy-section-inner">
            <h2 className="dy-section-title">Outcome</h2>
            <div className="dy-outcome">
              <p className="dy-section-text">
                After evaluating that VLA generalization was not yet reliable enough
                at the data scale a small team can realistically collect, we shipped
                a working end-to-end demo using deterministic trajectory replay.
                The full imitation learning infrastructure remains in place for
                future scaling.
              </p>
              <p className="dy-outcome-note">
                This is an active, ongoing project at Daily's. The codebase is private.
              </p>
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

export default DailysPage;
