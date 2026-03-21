export const CONFIG = {
  STAGE_WIDTH: 1024,
  STAGE_HEIGHT: 480,
  PLAYER_MAX_HP: 2000,
  ENEMY_MAX_HP: 1200,
  PLAYER_DAMAGE_PER_HIT: 10,
  ENEMY_DAMAGE_PER_HIT: 7,
  FRAMES_PER_SECOND: 12, // For custom pixel animations
};

// Sprite positions (constant across all screens)
export const SPRITE_POSITIONS = {
  PLAYER_HOME_X: 300,
  ENEMY_HOME_X: 800,
  SPRITE_Y: 290,
};

// At fast play, your loop lands roughly 3 player hits every ~4.3s, so 1200 HP with 10 damage/hit is close to ~2.8 to 3.1 minutes.
// Enemy hits about once every 3 player attacks, so 38 damage/hit makes the fight threatening but usually survivable with 2000 player HP.
