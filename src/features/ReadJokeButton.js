import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "../components/atoms/Button";

const ReadJokeButton = () => {
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
    utterance.voice = voices.find((v) => v.name === "Google UK English Name") || voices[0];

    // Když začne mluvit
    utterance.onstart = () => setIsSpeaking(true);

    // Když domluví
    utterance.onend = () => setIsSpeaking(false);

    window.speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  return (
    <Button onClick={speakJoke} disabled={isSpeaking || !joke}>
      📢 Read Joke
    </Button>
  );
};

export default ReadJokeButton;
