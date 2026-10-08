const fs = require('fs');
const path = require('path');

const SAMPLE_RATE = 44100;
const DURATION = 60.0; // 60 seconds exact
const NUM_SAMPLES = Math.floor(SAMPLE_RATE * DURATION);
const leftChannel = new Float32Array(NUM_SAMPLES);
const rightChannel = new Float32Array(NUM_SAMPLES);

// Helper functions for synthesis
function clamp(val, min = -1.0, max = 1.0) {
  return Math.max(min, Math.min(max, val));
}

function addSample(idx, left, right) {
  if (idx >= 0 && idx < NUM_SAMPLES) {
    leftChannel[idx] += left;
    rightChannel[idx] += right;
  }
}

// 1. Kick Drum (Punchy 808 sub)
function addKick(startTime, volume = 0.9) {
  const duration = 0.35;
  const numSamples = Math.floor(duration * SAMPLE_RATE);
  const startIdx = Math.floor(startTime * SAMPLE_RATE);

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const progress = i / numSamples;
    const freq = 160 * Math.exp(-progress * 18) + 40;
    const env = Math.exp(-progress * 8);
    // Transient click
    const click = progress < 0.03 ? (Math.random() * 2 - 1) * 0.4 : 0;
    const sample = (Math.sin(2 * Math.PI * freq * t) + click) * env * volume;
    addSample(startIdx + i, sample * 0.95, sample * 0.95);
  }
}

// 2. Snare Drum (Crisp body + noise tail)
function addSnare(startTime, volume = 0.7) {
  const duration = 0.28;
  const numSamples = Math.floor(duration * SAMPLE_RATE);
  const startIdx = Math.floor(startTime * SAMPLE_RATE);

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const progress = i / numSamples;
    const toneFreq = 190 * Math.exp(-progress * 10) + 120;
    const toneEnv = Math.exp(-progress * 12);
    const tone = Math.sin(2 * Math.PI * toneFreq * t) * toneEnv * 0.5;

    const noiseEnv = Math.exp(-progress * 9);
    const noise = (Math.random() * 2 - 1) * noiseEnv * 0.8;

    const sample = (tone + noise) * volume;
    addSample(startIdx + i, sample * 0.9, sample * 0.9);
  }
}

// 3. Hi-Hat (Crisp metallic sheen)
function addHiHat(startTime, volume = 0.35, open = false) {
  const duration = open ? 0.22 : 0.055;
  const numSamples = Math.floor(duration * SAMPLE_RATE);
  const startIdx = Math.floor(startTime * SAMPLE_RATE);

  for (let i = 0; i < numSamples; i++) {
    const progress = i / numSamples;
    const env = Math.exp(-progress * (open ? 9 : 24));
    // High-frequency noise
    const noise = (Math.random() * 2 - 1) * env * volume;
    addSample(startIdx + i, noise * 0.85, noise * 0.95);
  }
}

// 4. Synth Bass (Rich saw + square harmonic)
function addBass(startTime, duration, freq, volume = 0.55) {
  const numSamples = Math.floor(duration * SAMPLE_RATE);
  const startIdx = Math.floor(startTime * SAMPLE_RATE);

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const progress = i / numSamples;
    // Attack and release envelope
    let env = 1.0;
    if (progress < 0.05) env = progress / 0.05;
    else if (progress > 0.85) env = (1.0 - progress) / 0.15;

    // Sub + saw harmonic
    const sub = Math.sin(2 * Math.PI * freq * t);
    const saw = 2 * ((t * freq) % 1) - 1;
    const sample = (sub * 0.7 + saw * 0.3) * env * volume;
    addSample(startIdx + i, sample, sample);
  }
}

// 5. Synth Pluck / Arpeggio
function addPluck(startTime, freq, volume = 0.3, pan = 0.0) {
  const duration = 0.3;
  const numSamples = Math.floor(duration * SAMPLE_RATE);
  const startIdx = Math.floor(startTime * SAMPLE_RATE);

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const progress = i / numSamples;
    const env = Math.exp(-progress * 14);
    const osc1 = Math.sin(2 * Math.PI * freq * t);
    const osc2 = Math.sin(2 * Math.PI * freq * 2.01 * t) * 0.3;
    const sample = (osc1 + osc2) * env * volume;

    const left = sample * (1.0 - pan * 0.5);
    const right = sample * (1.0 + pan * 0.5);
    addSample(startIdx + i, left, right);
  }
}

// 6. Cyber Riser
function addRiser(startTime, endTime, fStart = 80, fEnd = 900, volume = 0.55) {
  const duration = endTime - startTime;
  const numSamples = Math.floor(duration * SAMPLE_RATE);
  const startIdx = Math.floor(startTime * SAMPLE_RATE);

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const p = i / numSamples; // 0 to 1
    const freq = fStart * Math.pow(fEnd / fStart, p);
    const env = Math.pow(p, 1.8) * volume;
    // Sawtooth with flutter
    const lfo = 1.0 + 0.1 * Math.sin(2 * Math.PI * 8 * t);
    const saw = 2 * ((t * freq * lfo) % 1) - 1;
    // Stereo swirl
    const pan = Math.sin(2 * Math.PI * 2 * t);
    addSample(startIdx + i, saw * env * (0.6 - pan * 0.3), saw * env * (0.6 + pan * 0.3));
  }
}

// 7. Whoosh Transition
function addWhoosh(startTime, duration = 0.6, volume = 0.45, reverse = false) {
  const numSamples = Math.floor(duration * SAMPLE_RATE);
  const startIdx = Math.floor(startTime * SAMPLE_RATE);

  for (let i = 0; i < numSamples; i++) {
    let p = i / numSamples;
    if (reverse) p = 1 - p;
    const env = Math.sin(p * Math.PI) * volume;
    const noise = (Math.random() * 2 - 1) * env;
    const pan = p * 2 - 1; // -1 to 1 pan
    addSample(startIdx + i, noise * (1 - pan * 0.4), noise * (1 + pan * 0.4));
  }
}

// 8. Stadium Crowd Cheer Swell (for RCB / VK 18)
function addStadiumCheer(startTime, duration = 5.0, volume = 0.35) {
  const numSamples = Math.floor(duration * SAMPLE_RATE);
  const startIdx = Math.floor(startTime * SAMPLE_RATE);

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const p = i / numSamples;
    // Swell envelope: slow rise, high sustain, gentle decay
    let env = 0;
    if (p < 0.25) env = p / 0.25;
    else if (p < 0.75) env = 1.0;
    else env = (1.0 - p) / 0.25;

    // Multi-band filtered noise simulate 80,000 roaring fans
    const n1 = Math.sin(2 * Math.PI * 260 * t + Math.random() * 0.5);
    const n2 = (Math.random() * 2 - 1) * 0.7;
    const mod = 1.0 + 0.3 * Math.sin(2 * Math.PI * 1.5 * t);
    const sample = (n1 * 0.4 + n2) * env * volume * mod;

    addSample(startIdx + i, sample * 0.9, sample * 0.9);
  }
}

// 9. Massive Impact / Sub Drop
function addImpact(startTime, volume = 0.95) {
  const duration = 1.6;
  const numSamples = Math.floor(duration * SAMPLE_RATE);
  const startIdx = Math.floor(startTime * SAMPLE_RATE);

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const progress = i / numSamples;
    const freq = 180 * Math.exp(-progress * 14) + 32;
    const sub = Math.sin(2 * Math.PI * freq * t) * Math.exp(-progress * 4);
    const transient = progress < 0.05 ? (Math.random() * 2 - 1) * 0.5 : 0;
    const sample = (sub + transient) * volume;
    addSample(startIdx + i, sample, sample);
  }
}

// 10. Crystal Chime Chord (Success / Outro)
function addChimes(startTime, freqs = [587.33, 739.99, 880.0, 1174.66], volume = 0.25) {
  const duration = 2.4;
  const numSamples = Math.floor(duration * SAMPLE_RATE);
  const startIdx = Math.floor(startTime * SAMPLE_RATE);

  freqs.forEach((freq, fIdx) => {
    const delay = fIdx * 0.04;
    for (let i = 0; i < numSamples; i++) {
      const t = i / SAMPLE_RATE;
      if (t < delay) continue;
      const progress = (t - delay) / (duration - delay);
      const env = Math.exp(-progress * 4.5);
      const sample = Math.sin(2 * Math.PI * freq * (t - delay)) * env * volume;
      const pan = (fIdx / freqs.length) * 1.4 - 0.7;
      addSample(startIdx + i, sample * (1 - pan * 0.3), sample * (1 + pan * 0.3));
    }
  });
}

// ── BUILD 60-SECOND SOUNDTRACK SCORE ──
console.log("Synthesizing 60-second audio track...");

const BPM = 120;
const BEAT = 60 / BPM; // 0.5 seconds
const BAR = BEAT * 4;  // 2.0 seconds

// ACT 1: 0s - 6s (Hook / Intrigue)
// Rising tension from 0 to 3.0s
addRiser(0.2, 3.0, 60, 650, 0.65);
addWhoosh(2.3, 0.7, 0.5);

// DROP 1 at 3.0s: "NOT JUST ANOTHER PORTFOLIO"
addImpact(3.0, 1.0);
addKick(3.0, 0.9);

// Heartbeat suspense at 4.0s, 5.0s
addKick(4.0, 0.6);
addKick(4.5, 0.4);
addKick(5.0, 0.7);
addWhoosh(5.4, 0.6, 0.4);

// ACT 2: 6s - 18s (Identity & Academic Rigor - Groove begins)
// 120 BPM Beat: 6 bars (12 seconds)
const NOTES_D_MIN = [73.42, 87.31, 110.0, 130.81]; // D2, F2, A2, C3
const PLUCK_NOTES = [293.66, 349.23, 440.0, 523.25, 587.33, 659.25, 698.46, 880.0];

for (let time = 6.0; time < 46.0; time += BEAT) {
  const beatNum = Math.round((time - 6.0) / BEAT);
  const beatInBar = beatNum % 4;

  // Kick on beats 0 & 2
  if (beatInBar === 0 || beatInBar === 2) {
    addKick(time, 0.85);
  }

  // Snare on beats 1 & 3
  if (beatInBar === 1 || beatInBar === 3) {
    addSnare(time, 0.75);
  }

  // Hi-Hats every 1/8th note
  addHiHat(time, 0.28, false);
  addHiHat(time + BEAT * 0.5, 0.22, (beatNum % 2 === 1));

  // Bassline
  const noteIdx = Math.floor(beatNum / 4) % NOTES_D_MIN.length;
  addBass(time, BEAT * 0.9, NOTES_D_MIN[noteIdx], 0.48);

  // Synth Pluck Arpeggio
  const pFreq = PLUCK_NOTES[(beatNum * 3) % PLUCK_NOTES.length];
  const pan = ((beatNum % 4) - 1.5) * 0.5;
  addPluck(time, pFreq, 0.25, pan);
  addPluck(time + BEAT * 0.5, pFreq * 1.5, 0.18, -pan);
}

// Scene Transitions & Whooshes in Act 2 & Act 3
addWhoosh(11.8, 0.5, 0.45);
addWhoosh(17.8, 0.5, 0.5);

// ACT 3: 18s - 32s (Technology, AI, Creative Lab)
addRiser(17.0, 18.0, 120, 520, 0.4);
addImpact(18.0, 0.8);
addWhoosh(24.8, 0.5, 0.4);
addWhoosh(31.6, 0.6, 0.55);

// ACT 4: 32s - 46s (Royal Challengers Bangalore / Virat Kohli #18)
// Stadium crowd swell from 32s to 46s!
addStadiumCheer(32.0, 14.0, 0.42);
addImpact(32.0, 0.95);
addWhoosh(38.8, 0.5, 0.4);

// ACT 5: 46s - 60s (Climax, Drop, and Official End-Card)
// Fast accelerating snare roll + rising synth sweep from 46s to 49.8s
const rollBeats = [
  // 1/8th notes
  46.0, 46.25, 46.5, 46.75, 47.0, 47.25, 47.5, 47.75,
  // 1/16th notes
  48.0, 48.125, 48.25, 48.375, 48.5, 48.625, 48.75, 48.875,
  49.0, 49.1, 49.2, 49.3, 49.4, 49.5, 49.6, 49.7, 49.8
];
rollBeats.forEach((t) => {
  const p = (t - 46.0) / 3.8;
  addSnare(t, 0.3 + p * 0.6);
  addKick(t, 0.4 + p * 0.5);
});
addRiser(46.0, 49.8, 100, 1400, 0.8);
addWhoosh(49.2, 0.7, 0.6);

// 49.8s - 50.2s: BREATH OF SILENCE (0.4s drop gap)

// 50.2s: EXPLOSIVE CLIMAX DROP!
addImpact(50.2, 1.0);
addKick(50.2, 0.95);
addStadiumCheer(50.2, 5.0, 0.3);

// 51.0s to 59.0s: Glorious Melodic Chord Outro + Positive Chimes
addChimes(51.0, [587.33, 739.99, 880.0, 1174.66], 0.35); // D major
addChimes(53.5, [659.25, 830.61, 987.77, 1318.51], 0.3);  // E major
addChimes(56.0, [587.33, 739.99, 880.0, 1479.98], 0.25); // D maj high

// Warm sub-bass tail
addBass(50.2, 7.0, 73.42, 0.4);

// Master limiter / soft clipping & fade out last 1.5 seconds
console.log("Applying master limiter and stereo encoding...");
for (let i = 0; i < NUM_SAMPLES; i++) {
  const t = i / SAMPLE_RATE;
  let fade = 1.0;
  if (t > 58.5) {
    fade = (60.0 - t) / 1.5;
  }
  leftChannel[i] = Math.tanh(leftChannel[i] * 1.1) * fade;
  rightChannel[i] = Math.tanh(rightChannel[i] * 1.1) * fade;
}

// Write to WAV file
const header = Buffer.alloc(44);
const dataSize = NUM_SAMPLES * 2 * 2; // 16-bit stereo

header.write('RIFF', 0);
header.writeUInt32LE(36 + dataSize, 4);
header.write('WAVE', 8);
header.write('fmt ', 12);
header.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
header.writeUInt16LE(1, 20);  // AudioFormat (1 for PCM)
header.writeUInt16LE(2, 22);  // NumChannels (2)
header.writeUInt32LE(SAMPLE_RATE, 24);
header.writeUInt32LE(SAMPLE_RATE * 2 * 2, 28); // ByteRate
header.writeUInt16LE(4, 32);  // BlockAlign
header.writeUInt16LE(16, 34); // BitsPerSample
header.write('data', 36);
header.writeUInt32LE(dataSize, 40);

const pcmData = Buffer.alloc(dataSize);
let offset = 0;
for (let i = 0; i < NUM_SAMPLES; i++) {
  const l = Math.floor(clamp(leftChannel[i]) * 32767);
  const r = Math.floor(clamp(rightChannel[i]) * 32767);
  pcmData.writeInt16LE(l, offset);
  offset += 2;
  pcmData.writeInt16LE(r, offset);
  offset += 2;
}

const outPath = path.resolve(__dirname, '../public/audio/ad-soundtrack.wav');
fs.writeFileSync(outPath, Buffer.concat([header, pcmData]));
console.log(`Audio successfully written to: ${outPath} (${(fs.statSync(outPath).size / (1024 * 1024)).toFixed(2)} MB)`);
