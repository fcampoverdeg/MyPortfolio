import React from "react";
import "./CroQuestCode.css";

const CroQuestCode = () => {
  return (
    <section className="code-section">
      <h2 className="section-title">Explore the Code</h2>

      <p className="code-intro">
        The <strong>CroQuest</strong> codebase brings together low-level
        embedded programming with a rich gameplay experience designed for a
        custom-built handheld console. More than just a collection of games,
        it’s a full-stack embedded system built from scratch to teach,
        challenge, and inspire.
      </p>

      <p className="code-intro">
        Inside the repository, you'll find a thoughtfully engineered firmware
        architecture that balances performance with modularity. Whether you're
        curious about Bluetooth communication, state-based game design, or
        real-time rendering on constrained hardware, this project offers
        practical, real-world examples.
      </p>

      <ul className="code-features">
        <li>
          Modular game engine architecture with reusable drawing and input
          systems
        </li>
        <li>
          Bluetooth multiplayer powered by <strong>NimBLE-Arduino</strong>
        </li>
        <li>
          Custom graphics engine using <strong>TFT_eSPI</strong> over an 8-bit
          parallel interface
        </li>
        <li>
          Save data handling via <strong>SD card</strong> filesystem
        </li>
        <li>Sound synthesis with programmable tone control</li>
      </ul>

      <p className="code-usecase">
        This project is ideal for students, hobbyists, or developers looking to
        understand how embedded systems and game logic can be integrated on
        microcontroller platforms. You’re encouraged to fork, modify, or
        contribute.
      </p>

      <p className="code-tech-stack">
        <strong>Tech Stack:</strong> ESP32, C++, Arduino Core, PlatformIO,
        TFT_eSPI, NimBLE-Arduino, SD library
      </p>

      <p className="code-credit">
        <em>
          Special thanks to <strong>Lucas Shadoyan </strong>
          and <strong>Connor McCue</strong> for their contributions to the
          CroQuest firmware.
        </em>
      </p>

      <a
        href="https://github.com/VT-CRO/CroQuest"
        target="_blank"
        rel="noopener noreferrer"
        className="github-link-button"
      >
        View Full Repository on GitHub
      </a>

      <div className="repo-tree-preview">
        <h3 className="tree-heading">📁 Project Structure (Simplified)</h3>
        <pre className="tree-code">
          {`CroQuest/
  ├── 3D_Model/           # Console shell and CAD files
  ├── CookBook/           # Docs, wiring guides, setup notes
  ├── ESP32/
  │   ├── src/            # All firmware source code
  │   │   ├── Core/
  │   │   ├── Games/
  │   │   │   ├── tic_tac_toe/
  │   │   │   ├── simon/
  │   │   │   ├── pong/
  │   │   │   └── ...
  │   │   ├── Bluetooth/
  │   │   ├── Menu/
  │   │   └── SettingsMenu/
  │   ├── lib/            # Libraries (JPEGDecoder, TFT_eSPI)
  │   ├── include/        # Shared headers
  │   ├── Files/          # Hardware docs, images, support files
  │   └── test/           # Unit tests or sandbox experiments
  ├── Images/             # Marketing and reference images
  ├── PCB/                # KiCad or PCB design files
  └── SD/                 # SD card assets (sprites, music, saves)
      ├── boot/
      ├── badges/
      ├── chess/
      ├── numpad/
    └── ...`}
        </pre>
      </div>
    </section>
  );
};

export default CroQuestCode;
