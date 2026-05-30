// src/components/ProjectCard.jsx
import React, { useState, useRef, useCallback } from "react";
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
  website,
  video,
  organization,
  path,
  reverse,
}) => {
  const navigate = useNavigate();
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef(null);

  const handleClick = () => {
    setFlipped(true);
    document.documentElement.style.scrollBehavior = "auto";

    const hashTarget = title.toLowerCase().replace(/[^\w]/g, "") + "-top";

    setTimeout(() => {
      navigate(`${path}#${hashTarget}`);
    }, 700);
  };

  const stopProp = (e) => e.stopPropagation();

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div
      className={`flip-card-container ${reverse ? "reverse" : ""}`}
      onClick={handleClick}
    >
      <div className="flip-card-wrapper">
        <div className={`flip-card ${flipped ? "flipped" : ""}`}>
          {/* Front Face */}
          <div className="flip-card-face flip-card-front">
            <div
              className={`project-card ${reverse ? "reverse" : ""}`}
              ref={cardRef}
              onMouseMove={handleMouseMove}
            >
              <div className="project-image">
                <img src={image} alt={title} />
              </div>
              <div className="project-content">
                <h2 dangerouslySetInnerHTML={{ __html: title }} />
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
                  {website && (
                    <a
                      href={website}
                      onClick={stopProp}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon={faWebAwesome} /> Website (In
                      process)
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
                        src="/images/general/vtcro_bird.jpg"
                        alt="VT CRO"
                        className="vtcro-icon"
                      /> VT CRO
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
