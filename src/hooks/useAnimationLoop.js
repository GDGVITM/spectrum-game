import { useState, useEffect } from "react";
import { lerp, wait } from "../animationUtils.js";

export function useAnimationLoop() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let frameId;
    const loop = () => {
      setTick((t) => t + 1);
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return tick;
}

export { lerp, wait };
