import React, { Suspense, useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei/core/OrbitControls";
import { Stage } from "@react-three/drei/core/Stage";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { useLoader } from "@react-three/fiber";
import { useSprings, animated } from "@react-spring/three";
import "./CroQuestModel.css";

// Animated STL mesh component
const Model = ({ url, color, springPos }) => {
  const geometry = useLoader(STLLoader, url);
  return (
    <animated.mesh geometry={geometry} scale={0.01} position={springPos}>
      <meshStandardMaterial color={color} metalness={0.3} roughness={0.2} />
    </animated.mesh>
  );
};

const CroQuestModelViewer = () => {
  const [disassembled, setDisassembled] = useState(false);

  const parts = useMemo(
    () => [
      {
        name: "Top",
        url: "/images/CroQuest/3Dmodel/CROQUEST-TOP 1.stl",
        color: "#ffffff",
        assembled: [0, 0, 0],
        disassembled: [0, 0.5, 0],
      },
      {
        name: "Bottom",
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
        color: "#ffffff",
        assembled: [0.0, 0.0, 0],
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
      <button
        className="disassemble-button"
        onClick={() => setDisassembled(!disassembled)}
      >
        {disassembled ? "Reassemble" : "Disassemble"}
      </button>

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
              />
            ))}
          </Stage>
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default CroQuestModelViewer;
