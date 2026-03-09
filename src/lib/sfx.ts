export type SoundKey =
  | "buttonHover"
  | "clickSwitch"
  | "lightSwitch"
  | "openCase"
  | "closeCase"
  | "badgeHover"
  | "openBadgeInterface"
  | "openModal";

const SOUND_FILES: Record<SoundKey, string> = {
  buttonHover: "/sounds/buttonHover.mp3",
  clickSwitch: "/sounds/clickSwitch.wav",
  lightSwitch: "/sounds/lightSwitch.mp3",
  openCase: "/sounds/openCase.mp3",
  closeCase: "/sounds/closeCase.mp3",
  badgeHover: "/sounds/badgeHover.mp3",
  openBadgeInterface: "/sounds/openBadgeInterface.mp3",
  openModal: "/sounds/openModal.mp3",
};

const audioCache = new Map<SoundKey, HTMLAudioElement>();
const lastPlayedAt = new Map<SoundKey, number>();

interface PlaySoundOptions {
  volume?: number;
  debounceMs?: number;
}

export const playSound = (sound: SoundKey, options: PlaySoundOptions = {}) => {
  if (typeof window === "undefined") return;

  const { volume = 0.35, debounceMs = 0 } = options;
  const now = Date.now();
  const last = lastPlayedAt.get(sound) ?? 0;

  if (debounceMs > 0 && now - last < debounceMs) {
    return;
  }

  let audio = audioCache.get(sound);
  if (!audio) {
    audio = new Audio(SOUND_FILES[sound]);
    audio.preload = "auto";
    audioCache.set(sound, audio);
  }

  audio.volume = volume;
  audio.currentTime = 0;
  void audio.play().catch(() => {
    // Ignore autoplay/user-gesture errors.
  });

  lastPlayedAt.set(sound, now);
};
