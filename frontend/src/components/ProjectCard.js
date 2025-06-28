// src/components/ProjectCard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faWebAwesome,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import "./ProjectCard.css";

const ProjectCard = ({
  title,
  image,
  description,
  tags,
  github,
  demo,
  video,
  organization,
  path,
  reverse,
}) => {
  const navigate = useNavigate();
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    setFlipped(true);
    setTimeout(() => {
      navigate(path);
    }, 1300);
  };

  const stopProp = (e) => e.stopPropagation();

  return (
    <div
      className={`flip-card-container ${reverse ? "reverse" : ""}`}
      onClick={handleClick}
    >
      <div className="flip-card-wrapper">
        <div className={`flip-card ${flipped ? "flipped" : ""}`}>
          {/* Front Face */}
          <div className="flip-card-face flip-card-front">
            <div className={`project-card ${reverse ? "reverse" : ""}`}>
              <div className="project-image">
                <img src={image} alt={title} />
              </div>
              <div className="project-content">
                <h2>{title}</h2>
                <p>{description}</p>
                <div className="project-tags">
                  {tags.map((tag, idx) => (
                    <span key={idx} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="project-buttons">
                  {github && (
                    <a
                      href={github}
                      onClick={stopProp}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon={faGithub} /> GitHub
                    </a>
                  )}
                  {demo && (
                    <a
                      href={demo}
                      onClick={stopProp}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon={faWebAwesome} /> Live Demo
                    </a>
                  )}
                  {organization && (
                    <a
                      href={organization}
                      onClick={stopProp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="vtcro-button"
                    >
                      <img
                        src="/images/general/VTCRO.png"
                        alt="VT Cro"
                        className="vtcro-icon"
                      />
                    </a>
                  )}
                  {video && (
                    <a
                      href={video}
                      onClick={stopProp}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon={faYoutube} /> Video
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Back Face */}
          <div className="flip-card-face flip-card-back">
            <div className="project-card">
              <div className="loading-message">Loading...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
