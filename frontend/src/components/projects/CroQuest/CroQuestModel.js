import React, { Suspense, useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei/core/OrbitControls";
import { Stage } from "@react-three/drei/core/Stage";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { useLoader } from "@react-three/fiber";
import { useSprings, animated } from "@react-spring/three";
import "./CroQuestModel.css";

// Animated STL mesh component
const Model = ({ url, color, springPos, highlighted, dimmed }) => {
  const geometry = useLoader(STLLoader, url);
  return (
    <animated.mesh geometry={geometry} scale={0.01} position={springPos}>
      <meshStandardMaterial
        color={highlighted ? "#aaaaff" : color}
        metalness={highlighted ? 0.5 : 0.3}
        roughness={highlighted ? 0.15 : 0.2}
        opacity={dimmed ? 0.2 : 1}
        transparent={dimmed}
      />
    </animated.mesh>
  );
};

const CroQuestModelViewer = () => {
  const [disassembled, setDisassembled] = useState(false);
  const [selectedPart, setSelectedPart] = useState(null);

  const parts = useMemo(
    () => [
      {
        name: "Front",
        url: "/images/CroQuest/3Dmodel/CROQUEST-TOP 1.stl",
        color: "#ffffff",
        assembled: [0, 0, 0],
        disassembled: [0, 0.5, 0],
      },
      {
        name: "Back",
        url: "/images/CroQuest/3Dmodel/CROQUEST-BOTTOM1.stl",
        color: "#000000",
        assembled: [0, 0, 0],
        disassembled: [0, -0.5, 0],
      },
      {
        name: "Battery",
        url: "/images/CroQuest/3Dmodel/CROQUEST-BATTERY.stl",
        color: "#000000",
        assembled: [0, 0, 0],
        disassembled: [1, -0.2, 0],
      },
      {
        name: "DPad",
        url: "/images/CroQuest/3Dmodel/dpad.stl",
        color: "#000000",
        assembled: [0.0, 0.0, 0.0],
        disassembled: [-0.8, 0.2, 0.6],
      },
      {
        name: "Switch",
        url: "/images/CroQuest/3Dmodel/SWITCH SLIDER.stl",
        color: "#000000",
        assembled: [-0.2, 0.0, 0.0],
        disassembled: [0.2, 0.05, 1],
      },
    ],
    []
  );

  const [springs] = useSprings(parts.length, (index) => ({
    position: disassembled ? parts[index].disassembled : parts[index].assembled,
    config: { mass: 1, tension: 170, friction: 26 },
  }));

  // Update springs on state change
  React.useEffect(() => {
    springs.forEach((_, i) => {
      springs[i].position.start(
        disassembled ? parts[i].disassembled : parts[i].assembled
      );
    });
  }, [disassembled, springs, parts]);

  return (
    <div className="model-viewer-container">
      <div className="model-canvas-wrap">
        <Canvas camera={{ position: [3, 3, 3], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={null}>
            <Stage environment="city" intensity={0.6}>
              {springs.map((spring, i) => (
                <Model
                  key={i}
                  url={parts[i].url}
                  color={parts[i].color}
                  springPos={spring.position}
                  highlighted={selectedPart === i}
                  dimmed={selectedPart !== null && selectedPart !== i}
                />
              ))}
            </Stage>
          </Suspense>
          <OrbitControls />
        </Canvas>
      </div>

      <div className="model-controls">
        <div className="model-controls-left">
          <button
            className={`disassemble-button ${disassembled ? "active" : ""}`}
            onClick={() => setDisassembled(!disassembled)}
          >
            {disassembled ? "Reassemble" : "Disassemble"}
          </button>
          <span className="model-hint">Drag to rotate, scroll to zoom</span>
        </div>
        <div className="model-parts-legend">
          {parts.map((p, i) => (
            <button
              key={i}
              className={`model-part-btn ${selectedPart === i ? "active" : ""}`}
              onClick={() => setSelectedPart(selectedPart === i ? null : i)}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CroQuestModelViewer;
