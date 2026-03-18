import React, { useRef, useEffect, useState } from "react";
import Background from "./Background.jsx";
import Particles from "./Particles.jsx";
import "../game.css";

export default function RewardScreen({ gameState }) {
  const [time, setTime] = useState(0);
  const [text1Alpha, setText1Alpha] = useState(0);
  const [text2Alpha, setText2Alpha] = useState(0);
  const [text3Alpha, setText3Alpha] = useState(0);
  const [buttonAlpha, setButtonAlpha] = useState(0);
  const [buttonsEnabled, setButtonsEnabled] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => {
        const newTime = t + 1;

        if (newTime > 30) {
          setText1Alpha(Math.min(1, (newTime - 30) / 30));
        }
        if (newTime > 60) {
          setText2Alpha(Math.min(1, (newTime - 60) / 30));
        }
        if (newTime > 90) {
          setText3Alpha(Math.min(1, (newTime - 90) / 30));
        }
        if (newTime > 120) {
          setButtonAlpha(Math.min(1, (newTime - 120) / 30));
          setButtonsEnabled(true);
        }

        return newTime;
      });
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, []);

  const handleRestart = () => {
    gameState.resetGame();
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "#0d1117",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Background />

      <div
        style={{
          position: "absolute",
          top: "150px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "300px",
          background:
            "radial-gradient(circle, rgba(255, 170, 0, 0.3) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      <Particles count={50} type="ember" />

      <div
        className="victory-text"
        style={{
          position: "absolute",
          top: "150px",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: text1Alpha,
          transition: "opacity 0.2s",
          fontSize: "48px",
        }}>
        VICTORY
      </div>

      <div
        style={{
          position: "absolute",
          top: "230px",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: text2Alpha,
          transition: "opacity 0.2s",
          fontSize: "24px",
          fontFamily: "monospace",
          color: "#ffffff",
        }}>
        You have defended the realm.
      </div>

      <div
        style={{
          position: "absolute",
          top: "280px",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: text3Alpha,
          transition: "opacity 0.2s",
          fontSize: "16px",
          fontFamily: "monospace",
          color: "#aaaaaa",
        }}>
        SPECTRUM 2025 - GDG VITM
      </div>

      <button
        className="game-button"
        onClick={handleRestart}
        style={{
          position: "absolute",
          top: "350px",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: buttonAlpha,
          transition: "opacity 0.2s",
          cursor: buttonsEnabled ? "pointer" : "default",
          pointerEvents: buttonsEnabled ? "auto" : "none",
        }}>
        PLAY AGAIN
      </button>
    </div>
  );
}
