const FRAME_WIDTH = 128;
const FRAME_HEIGHT = 128;
const SCALE = 3;

export const SPRITE_DIMENSIONS = {
  FRAME_WIDTH,
  FRAME_HEIGHT,
  SCALE,
  WIDTH: FRAME_WIDTH * SCALE,
  HEIGHT: FRAME_HEIGHT * SCALE,
  HALF_WIDTH: (FRAME_WIDTH * SCALE) / 2,
  HALF_HEIGHT: (FRAME_HEIGHT * SCALE) / 2,
};

export const PLAYER_ANIMATIONS = {
  idle: { url: "/assets/Samurai/Idle.png", frames: 6, fps: 8 },
  walk: { url: "/assets/Samurai/Walk.png", frames: 9, fps: 10 },
  run: { url: "/assets/Samurai/Run.png", frames: 8, fps: 14 },
  attack1: { url: "/assets/Samurai/Attack_1.png", frames: 4, fps: 12 },
  attack2: { url: "/assets/Samurai/Attack_2.png", frames: 5, fps: 12 },
  attack3: { url: "/assets/Samurai/Attack_3.png", frames: 4, fps: 12 },
  protect: { url: "/assets/Samurai/Protection.png", frames: 3, fps: 8 },
  hit: { url: "/assets/Samurai/Hurt.png", frames: 3, fps: 8 },
  death: { url: "/assets/Samurai/Dead.png", frames: 6, fps: 8 },
};

export const ENEMY_ANIMATIONS = {
  idle: { url: "/assets/Samurai_Commander/Idle.png", frames: 5, fps: 8 },
  walk: { url: "/assets/Samurai_Commander/Walk.png", frames: 9, fps: 10 },
  run: { url: "/assets/Samurai_Commander/Run.png", frames: 8, fps: 14 },
  attack1: {
    url: "/assets/Samurai_Commander/Attack_1.png",
    frames: 4,
    fps: 12,
  },
  attack2: {
    url: "/assets/Samurai_Commander/Attack_2.png",
    frames: 5,
    fps: 12,
  },
  attack3: {
    url: "/assets/Samurai_Commander/Attack_3.png",
    frames: 4,
    fps: 12,
  },
  protect: { url: "/assets/Samurai_Commander/Protect.png", frames: 2, fps: 8 },
  hit: { url: "/assets/Samurai_Commander/Hurt.png", frames: 2, fps: 10 },
  death: { url: "/assets/Samurai_Commander/Dead.png", frames: 6, fps: 8 },
};

const SHARED_SPRITE_URLS = [
  ...Object.values(PLAYER_ANIMATIONS).map(({ url }) => url),
  ...Object.values(ENEMY_ANIMATIONS).map(({ url }) => url),
];

export const CRITICAL_ASSET_URLS = [
  "/assets/background.png",
  "/assets/gdg-logo.png",
  "/assets/fullscreen_button.png",
  "/assets/phone-rotate.png",
  PLAYER_ANIMATIONS.idle.url,
  ENEMY_ANIMATIONS.idle.url,
];

export const WARM_ASSET_URLS = Array.from(
  new Set([
    ...SHARED_SPRITE_URLS,
    "/background.mp4",
    "/assets/background.png",
    "/assets/gdg-logo.png",
    "/assets/fullscreen_button.png",
    "/assets/phone-rotate.png",
    "/assets/hero-icon.png",
    "/assets/enemy-icon.png",
    "/assets/sword.png",
    "/assets/sword_button.png",
    "/assets/player_speech.mp3",
    "/assets/fight.ogg",
    "/assets/sword-slice.mp3",
    "/assets/hit.mp3",
    "/assets/argh.mp3",
  ]),
);
