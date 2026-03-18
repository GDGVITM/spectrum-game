import React, { useEffect, useState } from "react";
import "../game.css";

export default function AttackPopup({ visible, onClose }) {
  const [scale, setScale] = useState(0);

  useEffect(() => {
    if (visible) {
      setScale(1);
    } else {
      setScale(0);
    }
  }, [visible]);

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) scale(${scale})`,
        transformOrigin: "center center",
        transition: "transform 0.3s ease-out",
        pointerEvents: visible ? "auto" : "none",
        zIndex: 100,
      }}>
      <div
        style={{
          backgroundColor: "rgba(13, 17, 23, 0.95)",
          border: "4px solid #ffd700",
          borderRadius: "8px",
          padding: "20px 40px",
          textAlign: "center",
          boxShadow: "0 0 20px rgba(255, 215, 0, 0.5)",
          minWidth: "300px",
        }}>
        <div
          style={{
            fontFamily: '"Press Start 2P", cursive',
            fontSize: "24px",
            color: "#ffd700",
            textShadow:
              "2px 2px 0px #ff1493, 4px 4px 0px rgba(255, 215, 0, 0.3)",
            letterSpacing: "2px",
            animation: visible ? "pulse 0.6s ease-in-out infinite" : "none",
          }}>
          CLICK TO ATTACK
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}
