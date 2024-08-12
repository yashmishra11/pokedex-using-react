import CustomRoutes from "./routes/CustomRoutes";
import { Link } from "react-router-dom";
import "./App.css";
import React, { useEffect, useRef } from 'react';

const App = () => {
  const audioRef = useRef(null);

  const handlePlayAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.error("Audio failed to play:", error);
      });
    }
  };

  return (
    <div className="outer-pokedex" onClick={handlePlayAudio}>
      <h1 id="pokedex-heading">
        <audio ref={audioRef} src="/pokemon-instu.wav" />
        <Link className="pokedex-heading" to="/">Pokedex</Link>
      </h1>
      <CustomRoutes />
    </div>
  );
}

export default App;
