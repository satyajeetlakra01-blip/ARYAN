"use client";

// Web Audio API Synthesizer Engine for Aryan Tanty Portfolio
// 100% Client-Side, Zero External Audio Files, High-Fidelity Cyber Acoustics

let audioCtx: AudioContext | null = null;
let isMutedState = false;
let ambientOscillators: { osc: OscillatorNode; gain: GainNode }[] = [];
let ambientGain: GainNode | null = null;
let isAmbientPlaying = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function isSoundMuted(): boolean {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("aryan_audio_muted");
    if (saved !== null) {
      isMutedState = saved === "true";
    }
  }
  return isMutedState;
}

export function setSoundMuted(muted: boolean): void {
  isMutedState = muted;
  if (typeof window !== "undefined") {
    localStorage.setItem("aryan_audio_muted", String(muted));
  }
  if (muted && isAmbientPlaying) {
    stopAmbientPad();
  }
}

// Crisp, high-end tactile UI click (1200Hz -> 320Hz downward sweep)
export function playUiClick(): void {
  if (isSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.045);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  } catch {
    // Graceful fallback
  }
}

// Ultra-subtle, warm harmonic shimmer on hover (480Hz -> 640Hz micro-chime)
export function playUiHover(): void {
  if (isSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(540, now);
    osc.frequency.linearRampToValueAtTime(680, now + 0.035);

    gain.gain.setValueAtTime(0.02, now);
    gain.gain.exponentialRampToValueAtTime(0.0005, now + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.045);
  } catch {
    // Graceful fallback
  }
}

// Positive success harmonic major chord (copy email, command executed)
export function playSuccessChime(): void {
  if (isSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const notes = [659.25, 830.61, 987.77, 1318.51]; // E5, G#5, B5, E6
    const now = ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now + idx * 0.04);

      gain.gain.setValueAtTime(0.05, now + idx * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.04);
      osc.stop(now + idx * 0.04 + 0.36);
    });
  } catch {
    // Graceful fallback
  }
}

// Futuristic cyber warp sweep (lighting modes, filter changes)
export function playWarpSound(): void {
  if (isSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(840, now + 0.12);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.13);
  } catch {
    // Graceful fallback
  }
}

// Stadium Crowd Roar / Tension synthesis (Virat Kohli RCB Chase)
export function playStadiumRoar(): void {
  if (isSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    // Synthesize noise buffer
    const bufferSize = ctx.sampleRate * 1.5; // 1.5 seconds
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    // Filter to make it sound like a packed 90,000 MCG stadium roar
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(420, ctx.currentTime);
    filter.Q.setValueAtTime(2.5, ctx.currentTime);

    const gain = ctx.createGain();
    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.45);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 1.5);
  } catch {
    // Graceful fallback
  }
}

// Generative ambient Lo-Fi cyberpunk drone chord progression
export function startAmbientPad(): void {
  if (isSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  if (isAmbientPlaying) return;

  try {
    ambientGain = ctx.createGain();
    ambientGain.gain.setValueAtTime(0.001, ctx.currentTime);
    ambientGain.gain.linearRampToValueAtTime(0.035, ctx.currentTime + 1.2);
    ambientGain.connect(ctx.destination);

    // Deep warm synth frequencies: D2, A2, F#3, C#4 (Warm Dmaj7)
    const chords = [73.42, 110.0, 185.0, 277.18];
    ambientOscillators = chords.map((freq) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      oscGain.gain.setValueAtTime(0.25, ctx.currentTime);

      osc.connect(oscGain);
      oscGain.connect(ambientGain!);
      osc.start();
      return { osc, gain: oscGain };
    });

    isAmbientPlaying = true;
  } catch {
    // Graceful fallback
  }
}

export function stopAmbientPad(): void {
  if (!isAmbientPlaying) return;
  const ctx = getAudioContext();
  if (ambientGain && ctx) {
    try {
      ambientGain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
      setTimeout(() => {
        ambientOscillators.forEach(({ osc }) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {
            // Already stopped
          }
        });
        ambientOscillators = [];
        isAmbientPlaying = false;
      }, 850);
    } catch {
      isAmbientPlaying = false;
    }
  } else {
    isAmbientPlaying = false;
  }
}

export function toggleAmbientPad(): boolean {
  if (isAmbientPlaying) {
    stopAmbientPad();
    return false;
  } else {
    startAmbientPad();
    return true;
  }
}

export function isAmbientPadActive(): boolean {
  return isAmbientPlaying;
}
