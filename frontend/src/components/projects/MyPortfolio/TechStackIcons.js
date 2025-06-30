import React from "react";
import {
  FaReact,
  FaCss3Alt,
  FaHtml5,
  FaJsSquare,
  FaFontAwesome,
  FaStream,
  FaNodeJs,
} from "react-icons/fa";
import {
  SiNetlify,
  SiThreedotjs,
  SiBlender,
  SiExpress,
  SiMongodb,
  SiWebgl,
} from "react-icons/si";

import "./TechStackIcons.css";

const icons = [
  { name: "React", icon: <FaReact style={{ color: "#61DAFB" }} /> },
  { name: "Zustand (State)", icon: <FaStream style={{ color: "#FF8800" }} /> }, // Not official, but orange works well
  { name: "JavaScript", icon: <FaJsSquare style={{ color: "#F7DF1E" }} /> },
  { name: "HTML5", icon: <FaHtml5 style={{ color: "#E34F26" }} /> },
  { name: "CSS3", icon: <FaCss3Alt style={{ color: "#1572B6" }} /> },
  {
    name: "Font Awesome",
    icon: <FaFontAwesome style={{ color: "#339AF0" }} />,
  },
  { name: "Netlify", icon: <SiNetlify style={{ color: "#00C7B7" }} /> },
  { name: "Node.js", icon: <FaNodeJs style={{ color: "#339933" }} /> },
  { name: "Threedot.js", icon: <SiThreedotjs style={{ color: "#000000" }} /> }, // Brand is minimalist black
  { name: "Blender", icon: <SiBlender style={{ color: "#F5792A" }} /> },
  { name: "Express", icon: <SiExpress style={{ color: "#FFFFFF" }} /> }, // Monochrome logo
  { name: "MongoDB", icon: <SiMongodb style={{ color: "#47A248" }} /> },
  { name: "WebGL", icon: <SiWebgl style={{ color: "#990000" }} /> }, // From official branding
];

const TechStackIcons = () => (
  <div className="carousel-wrapper">
    <div className="carousel-track">
      {[...icons, ...icons].map(({ name, icon }, index) => (
        <div className="tech-icon" key={`${name}-${index}`} title={name}>
          <div className="icon">{icon}</div>
          <span className="label">{name}</span>
        </div>
      ))}
    </div>
  </div>
);

export default TechStackIcons;
