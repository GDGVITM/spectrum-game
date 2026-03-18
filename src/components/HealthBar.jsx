import React, { useRef, useEffect, useState } from "react";
import { lerp } from "../animationUtils.js";
import "../game.css";

export default function HealthBar({
  x,
  y,
  width = 200,
  height = 20,
  maxHp = 100,
  hp = 100,
  color = "green",
}) {
  const [displayHp, setDisplayHp] = useState(hp);
  const lastHpRef = useRef(hp);

  useEffect(() => {
    let animationId;
    const animate = () => {
      if (Math.abs(displayHp - hp) < 0.5) {
        setDisplayHp(hp);
      } else {
        setDisplayHp((current) => lerp(current, hp, 0.1));
        animationId = requestAnimationFrame(animate);
      }
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [hp, displayHp]);

  const fillWidth = Math.max(0, (displayHp / maxHp) * (width - 4));
  const colorClass = color === "enemy" ? "enemy" : "";

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
      }}
      className="health-bar">
      <div
        className={`health-bar-fill ${colorClass}`}
        style={{
          width: `${fillWidth}px`,
        }}
      />
    </div>
  );
}
