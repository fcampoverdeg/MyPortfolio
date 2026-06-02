import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../Footer";
import "./AutonomousCar.css";

const techStack = [
  "C++", "Python", "ROS 2", "Gazebo", "RViz", "Nav2", "SLAM",
  "URDF/Xacro", "LiDAR", "RealSense", "Arduino", "Raspberry Pi", "Linux",
];

const subsystems = [
  {
    name: "Perception",
    description: "LiDAR scanning and Intel RealSense depth camera for real-time obstacle detection. Camera and depth data processed through ROS 2 sensor pipelines.",
    files: "camera.xacro, depth_camera.xacro, lidar.xacro",
  },
  {
    name: "SLAM & Mapping",
    description: "Simultaneous Localization and Mapping using SLAM Toolbox with async online mapping. The robot builds a map of its environment while tracking its own position.",
    files: "mapper_params_online_async.yaml, mapping.sh",
  },
  {
    name: "Navigation",
    description: "Nav2 path planning and autonomous navigation through obstacle courses. The car plans routes around ramps, blocks, and bridges using costmaps and planners.",
    files: "launch_robot.launch.py, twist_mux.yaml",
  },
  {
    name: "Simulation",
    description: "Full Gazebo simulation environment with custom URDF robot models, physics, and sensor simulation. Custom world meshes for the National Robotics Challenge obstacle course.",
    files: "launch_sim.launch.py, robot.urdf.xacro, gazebo_control.xacro",
  },
  {
    name: "Hardware Control",
    description: "Motor control through ros2_control, joystick teleoperation, and Arduino-based actuator interfaces. Raspberry Pi serves as the onboard compute platform.",
    files: "ros2_control.xacro, joystick.launch.py, my_controllers.yaml",
  },
  {
    name: "Robot Description",
    description: "Complete URDF/Xacro model defining the robot's physical structure, joints, links, sensors, and inertial properties for both simulation and visualization.",
    files: "robot_core.xacro, inertial_macros.xacro",
  },
];

const gallerySteps = [
  {
    title: "The Car",
    description: "Built from an RC car chassis with 3D-printed mounts, the vehicle packs a Raspberry Pi, Arduino, LiPo battery, motor controllers, and a full sensor suite into a compact frame.",
    media: [
      { src: "/images/car/car_front.jpg", type: "img" },
      { src: "/images/car/car_full.jpeg", type: "img" },
      { src: "/images/car/car_electronics.jpeg", type: "img" },
      { src: "/images/car/car_wiring.jpeg", type: "img" },
      { src: "/images/car/testing.mov", type: "video" },
    ],
  },
  {
    title: "Competition",
    description: "The National Robotics Challenge, where teams from across the country bring their autonomous vehicles to navigate obstacle courses.",
    media: [
      { src: "/images/car/NCB.jpg", type: "img" },
      { src: "/images/car/car_front.jpg", type: "img" },
    ],
  },
  {
    title: "Simulation",
    description: "The full system was developed and tested in Gazebo before deploying to hardware. Custom obstacle course meshes (ramps, blocks, bridges) matched the real competition layout.",
    media: [
      { src: "/images/car/map.jpg", type: "img" },
      { src: "/images/car/gazebo_slam_map.jpeg", type: "img" },
      { src: "/images/car/gazebo_rviz_lidar.jpeg", type: "img" },
      { src: "/images/car/gazebo_obstacles.jpeg", type: "img" },
    ],
  },
  {
    title: "Perception",
    description: "Intel RealSense depth camera providing real-time point cloud data for obstacle detection. The depth feed runs through ROS 2 sensor pipelines for integration with Nav2.",
    media: [
      { src: "/images/car/realsense_depth.jpeg", type: "img" },
      { src: "/images/car/realsense_pointcloud.jpeg", type: "img" },
    ],
  },
];

const CarGallery = () => {
  const [stepIdx, setStepIdx] = useState(0);
  const [mediaIdx, setMediaIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const resumeTimer = React.useRef(null);

  const step = gallerySteps[stepIdx];
  const featured = step.media[mediaIdx];

  const goToStep = useCallback((i) => {
    setStepIdx(i);
    setMediaIdx(0);
    setPaused(true);
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), 2000);
  }, []);

  const videoRef = React.useRef(null);

  useEffect(() => {
    if (paused) return;

    const current = gallerySteps[stepIdx].media[mediaIdx];

    // If current media is a video, wait for it to end
    if (current.type === "video") {
      const video = videoRef.current;
      if (!video) return;

      const onEnded = () => {
        const currentStep = gallerySteps[stepIdx];
        if (mediaIdx + 1 < currentStep.media.length) {
          setMediaIdx(mediaIdx + 1);
        } else {
          setStepIdx((stepIdx + 1) % gallerySteps.length);
          setMediaIdx(0);
        }
      };

      // Remove loop so it fires 'ended'
      video.loop = false;
      video.addEventListener("ended", onEnded);
      return () => video.removeEventListener("ended", onEnded);
    }

    // For images, use 4s timeout
    const timeout = setTimeout(() => {
      const currentStep = gallerySteps[stepIdx];
      if (mediaIdx + 1 < currentStep.media.length) {
        setMediaIdx(mediaIdx + 1);
      } else {
        setStepIdx((stepIdx + 1) % gallerySteps.length);
        setMediaIdx(0);
      }
    }, 4000);
    return () => clearTimeout(timeout);
  }, [paused, stepIdx, mediaIdx]);

  return (
    <div className="ac-cg">
      <div className="ac-cg-hero">
        <span className="ac-cg-watermark">{String(stepIdx + 1).padStart(2, "0")}</span>
        <div className="ac-cg-featured" key={`${stepIdx}-${mediaIdx}`}>
          {featured.type === "video" ? (
            <video ref={videoRef} src={featured.src} muted autoPlay playsInline />
          ) : (
            <img src={featured.src} alt={step.title} />
          )}
        </div>
        <div className="ac-cg-overlay" key={`text-${stepIdx}`}>
          <h3 className="ac-cg-title">{step.title}</h3>
          <p className="ac-cg-desc">{step.description}</p>
        </div>
      </div>

      <div className="ac-cg-filmstrip">
        {step.media.map((m, i) => (
          <div
            key={i}
            className={`ac-cg-thumb ${i === mediaIdx ? "active" : ""}`}
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

      <div className="ac-cg-steps">
        {gallerySteps.map((s, i) => (
          <button
            key={i}
            className={`ac-cg-step-btn ${i === stepIdx ? "active" : ""}`}
            onClick={() => goToStep(i)}
          >
            <span className="ac-cg-step-num">{String(i + 1).padStart(2, "0")}</span>
            <span className="ac-cg-step-label">{s.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const AutonomousCarPage = () => {
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
    const reveals = document.querySelectorAll(".ac-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("ac-visible");
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => reveals.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <>
      <div id="autonomouscar-top" className="ac-page">
        {/* ========== HERO ========== */}
        <div className="ac-hero">
          <div className="ac-hero-content">
            <Link to="/portfolio" className="ac-back-btn">
              <FontAwesomeIcon icon={faArrowLeft} /> Back to Portfolio
            </Link>
            <p className="ac-hero-label">
              National Robotics Challenge &middot; VT CRO
            </p>
            <h1 className="ac-hero-title">Autonomous Car</h1>
            <p className="ac-hero-subtitle">
              A fully autonomous vehicle built with ROS 2, Gazebo, and Nav2 to
              navigate obstacle courses for the National Robotics Challenge.
              Features real-time SLAM mapping, LiDAR-based perception, depth
              camera integration, and autonomous path planning.
            </p>
            <div className="ac-hero-buttons">
              <a
                href="https://github.com/VT-CRO/NationalRoboticsChallengeCode"
                target="_blank"
                rel="noopener noreferrer"
                className="ac-btn ac-btn-primary"
              >
                <FontAwesomeIcon icon={faGithub} /> View on GitHub
              </a>
              <a
                href="https://www.vtcro.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="ac-btn ac-btn-ghost"
              >
                <img src="/images/general/vtcro_bird.jpg" alt="VT CRO" className="ac-vtcro-icon" /> VT CRO
              </a>
            </div>
          </div>
          <div className="ac-hero-image">
            <img src="/images/car/car_front.jpg" alt="Autonomous Car at NRC" />
          </div>
        </div>

        {/* ========== OVERVIEW ========== */}
        <div className="ac-section ac-reveal">
          <div className="ac-section-inner">
            <h2 className="ac-section-title">Overview</h2>
            <p className="ac-section-text">
              For the National Robotics Challenge, our team at VT CRO built an
              autonomous vehicle that could navigate an obstacle course without
              any human control. The car had to detect ramps, bridges, and blocks,
              plan a path around them, and reach the finish line on its own.
            </p>
            <p className="ac-section-text">
              The vehicle uses ROS 2 as its software backbone, with a LiDAR
              scanner and Intel RealSense depth camera feeding data into a SLAM
              system that builds a live map of the environment. Nav2 handles
              path planning and obstacle avoidance, while the entire system was
              first developed and tested in Gazebo simulation before deploying
              to the physical car.
            </p>
          </div>
        </div>

        {/* ========== TECH STACK ========== */}
        <div className="ac-section ac-reveal">
          <div className="ac-section-inner">
            <h2 className="ac-section-title">Tech Stack</h2>
            <div className="ac-tech-strip">
              {techStack.map((t, i) => (
                <span key={i} className="ac-tech-chip">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ========== GALLERY ========== */}
        <div className="ac-section ac-section-wide ac-reveal">
          <div className="ac-section-inner">
            <h2 className="ac-section-title">Gallery</h2>
            <CarGallery />
          </div>
        </div>

        {/* ========== ARCHITECTURE ========== */}
        <div className="ac-section ac-section-wide ac-reveal">
          <div className="ac-section-inner">
            <h2 className="ac-section-title">System Architecture</h2>
            <p className="ac-section-text">
              The robot's software stack follows a modular ROS 2 architecture
              where each subsystem runs as independent nodes communicating
              through topics and services.
            </p>
            <div className="ac-arch-flow">
              <div className="ac-arch-node">
                <span className="ac-arch-label">Sensors</span>
                <span className="ac-arch-detail">LiDAR + RealSense</span>
              </div>
              <div className="ac-arch-arrow" />
              <div className="ac-arch-node">
                <span className="ac-arch-label">SLAM</span>
                <span className="ac-arch-detail">Map + Localize</span>
              </div>
              <div className="ac-arch-arrow" />
              <div className="ac-arch-node ac-arch-main">
                <span className="ac-arch-label">Nav2</span>
                <span className="ac-arch-detail">Plan + Avoid</span>
              </div>
              <div className="ac-arch-arrow" />
              <div className="ac-arch-node">
                <span className="ac-arch-label">Controller</span>
                <span className="ac-arch-detail">cmd_vel</span>
              </div>
              <div className="ac-arch-arrow" />
              <div className="ac-arch-node">
                <span className="ac-arch-label">Motors</span>
                <span className="ac-arch-detail">Arduino + Pi</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========== SUBSYSTEMS ========== */}
        <div className="ac-section ac-reveal">
          <div className="ac-section-inner">
            <h2 className="ac-section-title">Subsystems</h2>
            <div className="ac-subsystem-grid">
              {subsystems.map((s, i) => (
                <div key={i} className="ac-subsystem-card">
                  <div className="ac-subsystem-num">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="ac-subsystem-name">{s.name}</h3>
                  <p className="ac-subsystem-desc">{s.description}</p>
                  <code className="ac-subsystem-files">{s.files}</code>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========== PROJECT STRUCTURE ========== */}
        <div className="ac-section ac-reveal">
          <div className="ac-section-inner">
            <h2 className="ac-section-title">Project Structure</h2>
            <div className="ac-code-block">
              <div className="ac-code-header">
                <span className="ac-code-dot ac-dot-red" />
                <span className="ac-code-dot ac-dot-yellow" />
                <span className="ac-code-dot ac-dot-green" />
                <span className="ac-code-filename">tree</span>
              </div>
              <pre className="ac-code"><code>{`NationalRoboticsChallengeCode/
├── mini_car_bot/                 # Main autonomous car package
│   ├── description/              # URDF/Xacro robot model
│   │   ├── robot.urdf.xacro     # Main robot description
│   │   ├── robot_core.xacro     # Chassis, wheels, joints
│   │   ├── camera.xacro         # Camera sensor
│   │   ├── depth_camera.xacro   # RealSense depth camera
│   │   ├── lidar.xacro          # LiDAR scanner
│   │   └── gazebo_control.xacro # Simulation plugins
│   ├── config/                   # Nav2, SLAM, controller configs
│   └── launch/                   # ROS 2 launch files
├── car_ws/                       # Workspace with mapping scripts
│   └── mapping/                  # SLAM map data
├── world/                        # Gazebo world meshes
│   └── meshes/                   # Ramps, blocks, bridges
└── dingo_ws/                     # Dingo quadruped (related project)`}</code></pre>
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

export default AutonomousCarPage;
