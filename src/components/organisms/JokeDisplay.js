import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { Html } from "@react-three/drei";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";

import "../../styles/General.css";
import "../../styles/Buttons.css";
import "../../styles/Joke.css"

function TalkingHead({ isSpeaking }) {
  const meshRef = useRef();
  const mouthRef = useRef();
  const texture = useLoader(TextureLoader, "/chuck_face.png"); // Použijeme texturu Chuckovy tváře

  useFrame(() => {
    if (isSpeaking && mouthRef.current) {
      mouthRef.current.scale.y = 0.5 + Math.sin(Date.now() * 0.01) * 0.3; // Simulace otevírání pusy
    } else if (mouthRef.current) {
      mouthRef.current.scale.y = 0.1; // Zavřená pusa
    }
  });

  return (
    <group ref={meshRef} position={[0, 1, 0]}>
      {}
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* Ústa */}
      <mesh ref={mouthRef} position={[0, -0.5, 0.9]}>
        <cylinderGeometry args={[0.2, 0.2, 0.05, 32]} />
        <meshStandardMaterial color="black" />
      </mesh>
    </group>
  );
}

const JokeDisplay = () => {
  const joke = useSelector((state) => state.jokes.joke);
  const [voices, setVoices] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

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

  const speakJoke = () => {
    if (!joke || !joke.value) return;
    if (voices.length === 0) return;

    const utterance = new SpeechSynthesisUtterance(joke.value);
    utterance.voice = voices.find((v) => v.lang === "en-US") || voices[0];

    // Když začne mluvit
    utterance.onstart = () => setIsSpeaking(true);

    // Když domluví
    utterance.onend = () => setIsSpeaking(false);

    window.speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  return (
    <div class="joke-canvas">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} />
        <TalkingHead isSpeaking={isSpeaking} />
        {joke && (
          <Html position={[0, 2, 0]}>
            <div class="joke-card">
              {joke.value}
            </div>
          </Html>
        )}
      </Canvas>

      {joke && (
        <div class="button-container">
        <Button class="read-joke" onClick={speakJoke}>
          📢 Přečíst vtip
        </Button>
        </div>
      )}
    </div>
  );
};

export default JokeDisplay;
