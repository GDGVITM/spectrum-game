import React from "react";
import "../game.css";

export default function Background() {
  return (
    <video
      className="game-background"
      autoPlay
      loop
      muted
      playsInline
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transform: "scale(1.15)",
      }}>
      <source src="/background.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
