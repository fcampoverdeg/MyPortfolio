import React from "react";
import "./AutonomousCar.css";

const AutonomousCarPage = () => {
  return (
    <div className="autocar-page">
      <div className="autocar-hero">
        <h1 className="autocar-title">Autonomous Car</h1>
        <p className="autocar-subtitle">
          National Robotics Challenge — VT CRO
        </p>
      </div>

      <div className="autocar-content">
        <div className="autocar-section">
          <div className="autocar-image-wrapper">
            <img src="/images/car/NCB.jpg" alt="Autonomous Car" className="autocar-image" />
          </div>
          <div className="autocar-text">
            <h2>Overview</h2>
            <p>
              Engineered a fully autonomous vehicle using ROS 2 and Gazebo to
              navigate obstacle courses for the National Robotics Challenge.
              The system integrates real-time SLAM mapping, path planning with
              Nav2, and sensor fusion from LiDAR and RealSense cameras.
            </p>
            <p>
              Hardware integration included Arduino, Raspberry Pi, and custom
              URDF models for simulation and visualization in RViz.
            </p>
          </div>
        </div>

        <div className="autocar-section">
          <h2>Tech Stack</h2>
          <div className="autocar-tags">
            {["C++", "ROS 2", "Gazebo", "RViz", "Nav2", "SLAM", "Linux", "Arduino", "Raspberry Pi"].map((tag, i) => (
              <span key={i} className="autocar-tag">{tag}</span>
            ))}
          </div>
        </div>

        <div className="autocar-section">
          <h2>Key Contributions</h2>
          <ul className="autocar-list">
            <li>Implemented SLAM-based autonomous navigation using Nav2 and LiDAR sensor data</li>
            <li>Built and tested simulation environments in Gazebo with custom URDF robot models</li>
            <li>Integrated RealSense depth camera for obstacle detection and avoidance</li>
            <li>Developed ROS 2 nodes for sensor fusion and real-time path planning</li>
          </ul>
        </div>

        <div className="autocar-section autocar-links">
          <a
            href="https://github.com/VT-CRO/NationalRoboticsChallengeCode"
            target="_blank"
            rel="noopener noreferrer"
            className="autocar-button"
          >
            View on GitHub
          </a>
          <a
            href="https://www.vtcro.org/design-teams/dog"
            target="_blank"
            rel="noopener noreferrer"
            className="autocar-button"
          >
            VT CRO Team Page
          </a>
        </div>
      </div>
    </div>
  );
};

export default AutonomousCarPage;
