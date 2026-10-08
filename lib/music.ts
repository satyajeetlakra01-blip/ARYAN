"use client";

// ██████████████████████████████████████████████████████
// ARYAN TANTY — CINEMATIC AUDIO ENGINE v3.0
// 100% Browser-Native Web Audio API — Zero External Files
// Generative music synth: dynamic chord progressions,
// kick drum, bassline, hi-hats, melody arpeggio, reverb
// ██████████████████████████████████████████████████████

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let isMutedState = false;

// Sequencer state
let sequencerActive = false;
let sequencerTimerId: ReturnType<typeof setTimeout> | null = null;
let currentBeat = 0;
let currentChordIdx = 0;

// Keep all running nodes for cleanup
const activeNodes: AudioNode[] = [];

// ── BPM & Timing ──
const BPM = 96;
const BEAT_MS = (60 / BPM) * 1000;

// ── Chord Progressions (MIDI note numbers, in Hz) ──
const NOTE_HZ: Record<string, number> = {
  C2: 65.41, E2: 82.41, G2: 98, B2: 123.47, D3: 146.83, F3: 174.61,
  A2: 110, Bb2: 116.54, G3: 196, E3: 164.81, A3: 220, C3: 130.81,
  B3: 246.94, D4: 293.66, F4: 349.23, G4: 392, A4: 440, E4: 329.63,
  C4: 261.63, Gb3: 185, Db3: 138.59, Ab3: 207.65, Eb3: 155.56, Bb3: 233.08,
};

// Solar/Cinematic chord progression: Cmaj7 -> Am7 -> Fmaj7 -> G
const CHORDS: number[][] = [
  [NOTE_HZ.C3, NOTE_HZ.E3, NOTE_HZ.G3, NOTE_HZ.B3],  // Cmaj7
  [NOTE_HZ.A2, NOTE_HZ.C3, NOTE_HZ.E3, NOTE_HZ.G3],   // Am7
  [NOTE_HZ.F3, NOTE_HZ.A3, NOTE_HZ.C4, NOTE_HZ.E4],   // Fmaj7
  [NOTE_HZ.G3, NOTE_HZ.B3, NOTE_HZ.D4, NOTE_HZ.F4],   // G7sus4
];

const MELODY_ARPS: number[][] = [
  [NOTE_HZ.E4, NOTE_HZ.G4, NOTE_HZ.B3, NOTE_HZ.D4],
  [NOTE_HZ.A4, NOTE_HZ.E4, NOTE_HZ.C4, NOTE_HZ.G4],
  [NOTE_HZ.F4, NOTE_HZ.A4, NOTE_HZ.C4, NOTE_HZ.E4],
  [NOTE_HZ.G4, NOTE_HZ.D4, NOTE_HZ.B3, NOTE_HZ.G4],
];

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    if (AC) audioCtx = new AC();
  }
  if (audioCtx?.state === "suspended") audioCtx.resume();
  return audioCtx;
}

function getMasterGain(): GainNode | null {
  const ctx = getAudioContext();
  if (!ctx) return null;
  if (!masterGain) {
    masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(isMutedState ? 0 : 0.7, ctx.currentTime);
    masterGain.connect(ctx.destination);
  }
  return masterGain;
}

// ── Reverb convolver (impulse-generated) ──
function createReverb(ctx: AudioContext, decay = 2.2): ConvolverNode {
  const len = ctx.sampleRate * decay;
  const buffer = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = buffer.getChannelData(ch);
    for (let i = 0; i < len; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.5);
    }
  }
  const conv = ctx.createConvolver();
  conv.buffer = buffer;
  return conv;
}

// ── Kick Drum (808-style sub) ──
function playKick(ctx: AudioContext, dest: AudioNode, time: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.frequency.setValueAtTime(150, time);
  osc.frequency.exponentialRampToValueAtTime(35, time + 0.2);
  gain.gain.setValueAtTime(1.0, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.3);
  osc.connect(gain);
  gain.connect(dest);
  osc.start(time);
  osc.stop(time + 0.32);
}

// ── Snare (noise burst) ──
function playSnare(ctx: AudioContext, dest: AudioNode, time: number) {
  const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.15, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.setValueAtTime(1800, time);
  gain.gain.setValueAtTime(0.5, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.14);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(dest);
  source.start(time);
  source.stop(time + 0.15);
}

// ── Hi-Hat ──
function playHiHat(ctx: AudioContext, dest: AudioNode, time: number, open = false) {
  const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.setValueAtTime(7000, time);
  gain.gain.setValueAtTime(open ? 0.25 : 0.12, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + (open ? 0.15 : 0.04));
  source.connect(filter);
  filter.connect(gain);
  gain.connect(dest);
  source.start(time);
  source.stop(time + (open ? 0.16 : 0.05));
}

// ── Pad Chord ──
function playPadChord(ctx: AudioContext, dest: AudioNode, time: number, notes: number[]) {
  const rev = createReverb(ctx, 2.8);
  rev.connect(dest);
  notes.forEach((freq) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(freq, time);
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.05, time + 0.08);
    gain.gain.setValueAtTime(0.05, time + BEAT_MS * 4 / 1000 - 0.05);
    gain.gain.linearRampToValueAtTime(0, time + BEAT_MS * 4 / 1000);
    osc.connect(gain);
    gain.connect(rev);
    osc.start(time);
    osc.stop(time + BEAT_MS * 4 / 1000 + 0.1);
  });
}

// ── Bassline ──
function playBass(ctx: AudioContext, dest: AudioNode, time: number, freq: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(400, time);
  osc.type = "triangle";
  osc.frequency.setValueAtTime(freq / 2, time);
  gain.gain.setValueAtTime(0.35, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + BEAT_MS * 2 / 1000 - 0.01);
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(dest);
  osc.start(time);
  osc.stop(time + BEAT_MS * 2 / 1000);
}

// ── Melody arpeggio note ──
function playArp(ctx: AudioContext, dest: AudioNode, time: number, freq: number) {
  const rev = createReverb(ctx, 1.2);
  rev.connect(dest);
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, time);
  gain.gain.setValueAtTime(0.12, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + BEAT_MS / 1000 - 0.01);
  osc.connect(gain);
  gain.connect(rev);
  osc.start(time);
  osc.stop(time + BEAT_MS / 1000);
}

// ── Main sequencer step ──
function sequencerStep() {
  if (!sequencerActive) return;
  const ctx = getAudioContext();
  const dest = getMasterGain();
  if (!ctx || !dest) return;

  const t = ctx.currentTime;
  const beat = currentBeat % 16;
  const chordIdx = Math.floor(currentBeat / 16) % CHORDS.length;

  if (beat === 0) {
    currentChordIdx = chordIdx;
    playPadChord(ctx, dest, t, CHORDS[currentChordIdx]);
    playBass(ctx, dest, t, CHORDS[currentChordIdx][0]);
  }

  // Kick pattern: 0, 4, 8, 12 (every quarter)
  if (beat === 0 || beat === 4 || beat === 8 || beat === 12) {
    playKick(ctx, dest, t);
  }

  // Snare: beats 4 & 12
  if (beat === 4 || beat === 12) {
    playSnare(ctx, dest, t);
  }

  // Hi-hats: every even beat, open on 6 & 14
  if (beat % 2 === 0) {
    playHiHat(ctx, dest, t, beat === 6 || beat === 14);
  }

  // Melody arp: runs on beats 1, 3, 5, 7...
  const arpNote = MELODY_ARPS[currentChordIdx][(beat / 2) % 4];
  if (beat % 2 === 1 && arpNote) {
    playArp(ctx, dest, t, arpNote);
  }

  currentBeat++;
  sequencerTimerId = setTimeout(sequencerStep, BEAT_MS / 2); // 8th notes
}

// ── Public Controls ──
export function startMusic(): void {
  if (sequencerActive) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  sequencerActive = true;
  currentBeat = 0;
  sequencerStep();
}

export function stopMusic(): void {
  sequencerActive = false;
  if (sequencerTimerId) {
    clearTimeout(sequencerTimerId);
    sequencerTimerId = null;
  }
}

export function toggleMusic(): boolean {
  if (sequencerActive) {
    stopMusic();
    return false;
  } else {
    startMusic();
    return true;
  }
}

export function isMusicPlaying(): boolean {
  return sequencerActive;
}

export function setMusicVolume(vol: number): void {
  const g = getMasterGain();
  if (g && audioCtx) {
    g.gain.linearRampToValueAtTime(Math.max(0, Math.min(1, vol)), audioCtx.currentTime + 0.1);
  }
}

// ── Re-export all original sound FX (import from here or from sound.ts) ──
export { isSoundMuted, setSoundMuted, playUiClick, playUiHover, playSuccessChime, playWarpSound, playStadiumRoar, startAmbientPad, stopAmbientPad, toggleAmbientPad, isAmbientPadActive } from "@/lib/sound";
