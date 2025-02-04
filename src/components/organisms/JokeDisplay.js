import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { Html } from "@react-three/drei";
import { useSelector } from "react-redux";
import Button from "../atoms/Button";

import "../../styles/General.css";
import "../../styles/Joke.css";

function TalkingHead({ isSpeaking }) {
  const meshRef = useRef();
  const mouthRef = useRef();
  
  const texture = useLoader(TextureLoader, "/chuck_face.png");
  const mouthTexture = useLoader(TextureLoader, "/chuck_face_mouth.png");

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.PI / -2.5;
      meshRef.current.rotation.y += 0.00; // Rotace kolem osy Y
    }

    if (mouthRef.current) {
      if (isSpeaking) {
        mouthRef.current.scale.y = 0.3 + Math.abs(Math.sin(Date.now() * 0.02)) * 0.5; // Animace pusy
      } else {
        mouthRef.current.scale.y = 0.5; // Zavřená pusa
      }
    }
  });

  return (
    <group ref={meshRef} position={[0, 1, 0]}>
      {/* Hlava */}
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* Pusa */}
      <mesh ref={mouthRef} position={[0.9, -1.5, 0.2]}>
        <cylinderGeometry args={[0.8, 0.4, 0.5, 32]} />
        <meshStandardMaterial map={mouthTexture} transparent={true} />
      </mesh>
    </group>
  );
}

const JokeDisplay = ({ isSpeaking, setIsSpeaking, setSpeakJoke }) => {
  const joke = useSelector((state) => state.jokes.joke);
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
      }
    };

    loadVoices();
    speechSynthesis.addEventListener("voiceschanged", loadVoices);
    return () => speechSynthesis.removeEventListener("voiceschanged", loadVoices);
  }, []);

  useEffect(() => {
    setSpeakJoke(() => speakJoke);
  }, [joke, voices]);

  const speakJoke = () => {
    if (!joke || !joke.value) return;
    if (voices.length === 0) return;

    const utterance = new SpeechSynthesisUtterance(joke.value);
    utterance.voice = voices.find((v) => v.name === "Google UK English Name") || voices[0];

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    window.speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="joke-canvas">
      <Canvas>
        <ambientLight intensity={0.8} />
        <pointLight position={[5, 5, 5]} />
        <TalkingHead isSpeaking={isSpeaking} />
        {joke && (
          <Html position={[-3.5, -1.5, 0]}>
            <div className="joke-card">{joke.value}</div>
          </Html>
        )}
      </Canvas>
    </div>
  );
};

export default JokeDisplay;

