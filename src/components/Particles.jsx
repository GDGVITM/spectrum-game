import React, { useEffect, useState } from "react";
import "../game.css";

export default function Particles({ count = 100, type = "snow" }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 1024,
      y: Math.random() * 480,
      speedY: Math.random() * 2 + 1,
      speedX:
        type === "snow" ? Math.random() * 1 - 0.5 : Math.random() * 0.5 - 0.25,
      scale: Math.random() * 2 + 1,
      duration: type === "ember" ? Math.random() * 2 + 1 : 5,
    }));
    setParticles(newParticles);
  }, [count, type]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        overflow: "hidden",
      }}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`particle ${type}`}
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${type === "snow" ? 4 * (particle.scale / 2) : 6 * (particle.scale / 2)}px`,
            height: `${type === "snow" ? 4 * (particle.scale / 2) : 6 * (particle.scale / 2)}px`,
            "--drift": `${particle.speedX * particle.duration * 20}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `-${Math.random() * particle.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
