import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useSelector } from "react-redux";

function RotatingChuck() {
  const meshRef = useRef();
  useFrame(() => (meshRef.current.rotation.y += 0.01));

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

const JokeDisplay = () => {
  const joke = useSelector((state) => state.jokes.joke);

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} />
      <RotatingChuck />
      {joke && (
        <Html position={[0, 1.5, 0]}>
          <div style={{ color: "white", background: "black", padding: "10px", borderRadius: "5px" }}>
            {joke.value}
          </div>
        </Html>
      )}
    </Canvas>
  );
};

export default JokeDisplay;