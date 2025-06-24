import React, { useState, useEffect } from "react";

const roles = [
  "Software Engineer.",
  "Developer.",
  "Designer.",
  "Web Developer.",
];

const TypewriterEffect = () => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentRole = roles[roleIndex];

    let timeout;
    if (!isDeleting) {
      // Typing phase
      if (charIndex < currentRole.length) {
        timeout = setTimeout(() => {
          setText(currentRole.slice(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
        }, 70);
      } else {
        // Pause at full word
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 1200);
      }
    } else {
      // Deleting phase
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setText(currentRole.slice(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);
        }, 120);
      } else {
        // Move to next word after delete
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 500);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  return (
    <span>
      {text}
      <span className="blinking-cursor">|</span>
    </span>
  );
};

export default TypewriterEffect;
