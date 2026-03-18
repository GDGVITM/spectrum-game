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
  style = {},
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

  const fillWidth = Math.max(0, (displayHp / maxHp) * width);
  const colorClass = color === "enemy" ? "enemy" : "";
  const isEnemy = color === "enemy";

  return (
    <div
      style={{
        position: x !== undefined || y !== undefined ? "absolute" : "relative",
        left: x !== undefined ? `${x}px` : undefined,
        top: y !== undefined ? `${y}px` : undefined,
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: "#222",
        overflow: "hidden",
        border: "none",
        clipPath: isEnemy
          ? "polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%)"
          : "polygon(0% 0%, 100% 0%, 92% 100%, 0% 100%)",
        ...style,
      }}
      className="health-bar-container">
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: isEnemy ? "flex-end" : "flex-start",
        }}>
        <div
          className={`health-bar-fill ${colorClass}`}
          style={{
            width: `${fillWidth}px`,
            height: "100%",
          }}
        />
      </div>
    </div>
  );
}
