import React, { useState, useEffect } from "react";
import { useGameState } from "./hooks/useGameState.js";
import { usePixiSound } from "./hooks/usePixiSound.js";
import { CONFIG } from "./constants/gameConfig.js";

import LoadingScreen from "./components/LoadingScreen.jsx";
import IntroScreen from "./components/IntroScreen.jsx";
import TutorialScreen from "./components/TutorialScreen.jsx";
import CombatScreen from "./components/CombatScreen.jsx";
import RewardScreen from "./components/RewardScreen.jsx";

import "./App.css";

// Preload assets
const ASSETS_TO_LOAD = [
  "/background.mp4",
  "/assets/Samurai/Idle.png",
  "/assets/Samurai/Walk.png",
  "/assets/Samurai/Run.png",
  "/assets/Samurai/Attack_1.png",
  "/assets/Samurai/Attack_2.png",
  "/assets/Samurai/Attack_3.png",
  "/assets/Samurai/Protection.png",
  "/assets/Samurai/Dead.png",
  "/assets/Samurai_Commander/Idle.png",
  "/assets/Samurai_Commander/Walk.png",
  "/assets/Samurai_Commander/Run.png",
  "/assets/Samurai_Commander/Attack_1.png",
  "/assets/Samurai_Commander/Attack_2.png",
  "/assets/Samurai_Commander/Attack_3.png",
  "/assets/Samurai_Commander/Protect.png",
  "/assets/Samurai_Commander/Hurt.png",
  "/assets/Samurai_Commander/Dead.png",
];

export default function App() {
  const gameState = useGameState();
  const sounds = usePixiSound();
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    async function loadAssets() {
      try {
        await Promise.all(
          ASSETS_TO_LOAD.map(
            (url) =>
              new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = resolve;
                img.onerror = reject;
                img.src = url;
              }),
          ),
        );
        setAssetsLoaded(true);
      } catch (e) {
        console.error("Asset loading error:", e);
        setAssetsLoaded(true); // Attempt to proceed anyway
      }
    }
    loadAssets();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const gameAspect = CONFIG.STAGE_WIDTH / CONFIG.STAGE_HEIGHT;
      const screenAspect = vw / vh;

      let newScale;
      if (screenAspect > gameAspect) {
        // Screen is wider
        newScale = vh / CONFIG.STAGE_HEIGHT;
      } else {
        // Screen is taller
        newScale = vw / CONFIG.STAGE_WIDTH;
      }
      setScale(newScale);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { screen } = gameState;

  if (!assetsLoaded) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          background: "#000",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "monospace",
          fontSize: "24px",
        }}>
        Loading Game Assets...
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}>
      <div
        style={{
          position: "relative",
          width: CONFIG.STAGE_WIDTH,
          height: CONFIG.STAGE_HEIGHT,
          overflow: "hidden",
          backgroundColor: "#0d1117",
          boxShadow: "0 0 20px rgba(255, 69, 0, 0.3)",
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}>
        {screen === "loading" && (
          <LoadingScreen gameState={gameState} sounds={sounds} />
        )}
        {screen === "intro" && <IntroScreen gameState={gameState} />}
        {screen === "tutorial" && <TutorialScreen gameState={gameState} />}
        {screen === "combat" && (
          <CombatScreen gameState={gameState} sounds={sounds} />
        )}
        {screen === "reward" && <RewardScreen gameState={gameState} />}
      </div>
    </div>
  );
}
