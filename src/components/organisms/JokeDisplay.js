import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";

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
  const [voices, setVoices] = useState([]);
  const [speechReady, setSpeechReady] = useState(false);

 
  const speakJoke = () => {
    if (!joke || !joke.value) {
      console.log("❌ Žádný vtip k přečtení.");
      return;
    }

  
    const availableVoices = speechSynthesis.getVoices();
    if (availableVoices.length === 0) {
      console.log("❌ Žádné hlasy nejsou dostupné. Možná je potřeba refresh.");
      return;
    }

    console.log("✅ Přehrávám vtip:", joke.value);

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(joke.value);
    utterance.voice = availableVoices.find((v) => v.lang === "en-US") || availableVoices[0];
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;

    speechSynthesis.speak(utterance);
  };


  useEffect(() => {
    const loadVoices = () => {
      const voicesList = speechSynthesis.getVoices();
      setVoices(voicesList);
      setSpeechReady(voicesList.length > 0);
      console.log("🔊 Načtené hlasy:", voicesList);
    };


    loadVoices();


    speechSynthesis.onvoiceschanged = loadVoices;
  }, []);


  useEffect(() => {
    if (speechReady && joke) {
      console.log("🔄 Nový vtip detekován, přehrávám...");
      speakJoke();
    }
  }, [joke, speechReady]);

  return (
    <>
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

      {joke && (
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          style={{ marginTop: "10px" }}
          onClick={speakJoke}
        >
          📢 Přečíst vtip
        </Button>
      )}
    </>
  );
};

export default JokeDisplay;
