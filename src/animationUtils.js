// Utility functions for animations without Pixi

export const lerp = (start, end, t) => start + (end - start) * t;

// Create sprite sheet frames by slicing an image into equal parts
export function getSpriteFrames(frameCount, width = 128, height = 128) {
  // Returns an array of frame indices - the actual cropping will be done via CSS background-position
  return Array.from({ length: frameCount }, (_, i) => i);
}

// Load an image and return it
export function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
