const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const SAMPLE_RATE = 44100;
const DURATION = 60.0;
const TOTAL_SAMPLES = Math.floor(SAMPLE_RATE * DURATION);

const masterLeft = new Float32Array(TOTAL_SAMPLES);
const masterRight = new Float32Array(TOTAL_SAMPLES);

const SFX_DIR = path.resolve(__dirname, '../public/sfx');
const TEMP_DIR = path.resolve(__dirname, '../temp-pcm');
if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });

function decodeMp3ToPcm(mp3Name) {
  const mp3Path = path.join(SFX_DIR, mp3Name);
  const pcmPath = path.join(TEMP_DIR, mp3Name.replace('.mp3', '.pcm'));
  if (!fs.existsSync(pcmPath)) {
    console.log(`Decoding ${mp3Name} -> PCM...`);
    execSync(`ffmpeg -y -i "${mp3Path}" -ar ${SAMPLE_RATE} -ac 2 -f s16le "${pcmPath}"`, { stdio: 'ignore' });
  }
  const buf = fs.readFileSync(pcmPath);
  const numSamples = buf.length / 4; // 2 channels * 2 bytes
  const left = new Float32Array(numSamples);
  const right = new Float32Array(numSamples);
  for (let i = 0; i < numSamples; i++) {
    left[i] = buf.readInt16LE(i * 4) / 32768.0;
    right[i] = buf.readInt16LE(i * 4 + 2) / 32768.0;
  }
  return { left, right, numSamples };
}

function mixTrack(pcm, startSec, volume = 1.0, maxDurationSec = null, fadeInSec = 0, fadeOutSec = 0) {
  const startSample = Math.floor(startSec * SAMPLE_RATE);
  let length = pcm.numSamples;
  if (maxDurationSec !== null) {
    length = Math.min(length, Math.floor(maxDurationSec * SAMPLE_RATE));
  }

  const fadeInSamples = Math.floor(fadeInSec * SAMPLE_RATE);
  const fadeOutSamples = Math.floor(fadeOutSec * SAMPLE_RATE);

  for (let i = 0; i < length; i++) {
    const targetIdx = startSample + i;
    if (targetIdx >= TOTAL_SAMPLES) break;

    let fade = 1.0;
    if (fadeInSamples > 0 && i < fadeInSamples) {
      fade *= i / fadeInSamples;
    }
    if (fadeOutSamples > 0 && i >= length - fadeOutSamples) {
      fade *= (length - i) / fadeOutSamples;
    }

    masterLeft[targetIdx] += pcm.left[i] * volume * fade;
    masterRight[targetIdx] += pcm.right[i] * volume * fade;
  }
}

console.log("=== Mixing Aryan Tanty Launch Ad Master Soundtrack ===");

// 1. Decode music & SFX from user folder
const bgMusic1 = decodeMp3ToPcm('bombinsound-upbeat-background-music-version-6-rise-600000.mp3');
const bgMusic2 = decodeMp3ToPcm('prettyjohn1-podcast-intro_28sec-576200.mp3');
const sfxVineBoom = decodeMp3ToPcm('chillbroo-vine-boom-sound-123-412318.mp3');
const sfxCinematicHit = decodeMp3ToPcm('lordsonny-cinematic-hit-159487.mp3');
const sfxSwoosh = decodeMp3ToPcm('dheerajakam4jor-swoosh-sound-effect-for-fight-scenes-or-transitions-2-149890.mp3');
const sfxRiser = decodeMp3ToPcm('dragon-studio-riser-swoosh-transition-390289.mp3');
const sfxPop = decodeMp3ToPcm('dragon-studio-pop-402324.mp3');
const sfxWarning = decodeMp3ToPcm('tithuh-warning-545568.mp3');
const sfxCircuit = decodeMp3ToPcm('freesound_community-doctor-strange-magic-circle-shield-sound-effect-38335.mp3');
const sfxShutter = decodeMp3ToPcm('universfield-camera-shutter-199580.mp3');
const sfxPunch = decodeMp3ToPcm('universfield-punch-impact-hit-567196.mp3');
const sfxBubble = decodeMp3ToPcm('universfield-bubble-pop-05-323639.mp3');

// 2. Lay down music bed (0s to 31s with Music 1, 31s to 59s with Music 2)
console.log("Adding background music bed...");
mixTrack(bgMusic1, 0.0, 0.65, 31.0, 0.1, 1.2);
mixTrack(bgMusic2, 30.5, 0.70, 27.5, 1.0, 1.5);

// 3. Layer Sound Effects at exact beat marks
console.log("Layering beat-synced sound effects...");

// ACT 1: HOOK (0s - 6s)
mixTrack(sfxWarning, 0.0, 0.35, 2.5);
mixTrack(sfxRiser, 1.6, 0.75);
mixTrack(sfxVineBoom, 2.6, 0.9); // "NOT JUST ANOTHER PORTFOLIO"
mixTrack(sfxShutter, 4.0, 0.6);
mixTrack(sfxShutter, 5.2, 0.6);

// ACT 2: IDENTITY & ACADEMIC RIGOR (6s - 16s)
mixTrack(sfxPunch, 6.2, 0.75); // "ICSE RIGOR" Title Slam
mixTrack(sfxSwoosh, 7.8, 0.5);
mixTrack(sfxShutter, 8.8, 0.6);
mixTrack(sfxPop, 10.4, 0.65); // 100% DISCIPLINE
mixTrack(sfxPop, 12.0, 0.65); // 60 FPS MOTION
mixTrack(sfxSwoosh, 14.5, 0.55);

// ACT 3: CYBER CIRCUIT BOARD & TECH (16s - 31s)
// >>> PIERCING CIRCUIT BOARD SFX <<<
mixTrack(sfxCircuit, 16.0, 0.7, 5.0, 0.2, 0.5);
mixTrack(sfxPunch, 16.2, 0.8);
mixTrack(sfxShutter, 18.5, 0.6);
mixTrack(sfxSwoosh, 21.0, 0.5);
mixTrack(sfxPop, 23.0, 0.6);
mixTrack(sfxShutter, 25.5, 0.6);
mixTrack(sfxSwoosh, 28.0, 0.5);
mixTrack(sfxRiser, 29.8, 0.8);

// ACT 4: ROYAL CHALLENGERS & VK 18 (31s - 45s)
mixTrack(sfxCinematicHit, 31.0, 0.95, 4.0); // BASS HIT on "#18 DNA"
mixTrack(sfxShutter, 33.2, 0.6);
mixTrack(sfxVineBoom, 35.5, 0.75); // "CHASE MASTER MENTALITY"
mixTrack(sfxShutter, 37.8, 0.6);
mixTrack(sfxPunch, 40.0, 0.75); // "PLAY BOLD"
mixTrack(sfxSwoosh, 42.5, 0.55);

// ACT 5: THE CLIMAX & END-CARD (45s - 60s)
mixTrack(sfxCircuit, 45.0, 0.6, 4.2); // Circuit surge build
mixTrack(sfxRiser, 48.0, 0.95);
// 49.5s - 50.0s: Silence gap for impact
mixTrack(sfxCinematicHit, 50.0, 1.0, 5.0); // EXPLOSIVE CLIMAX DROP
mixTrack(sfxVineBoom, 50.0, 0.85);
mixTrack(sfxShutter, 51.5, 0.65); // Avatar pop
mixTrack(sfxPop, 53.0, 0.7); // aryantanty.vercel.app CTA
mixTrack(sfxBubble, 55.0, 0.6); // Verified Badge

// 4. Master Limiter & Normalization
console.log("Applying master limiter and stereo encoding...");
let peak = 0;
for (let i = 0; i < TOTAL_SAMPLES; i++) {
  peak = Math.max(peak, Math.abs(masterLeft[i]), Math.abs(masterRight[i]));
}
console.log(`Peak audio level before limiting: ${peak.toFixed(2)}`);

const norm = peak > 0 ? (0.95 / Math.max(peak, 1.0)) : 1.0;
for (let i = 0; i < TOTAL_SAMPLES; i++) {
  const t = i / SAMPLE_RATE;
  let fadeOut = 1.0;
  if (t > 58.5) fadeOut = (60.0 - t) / 1.5;

  masterLeft[i] = Math.tanh(masterLeft[i] * norm) * fadeOut;
  masterRight[i] = Math.tanh(masterRight[i] * norm) * fadeOut;
}

// 5. Write 16-bit stereo WAV
const dataSize = TOTAL_SAMPLES * 2 * 2;
const header = Buffer.alloc(44);
header.write('RIFF', 0);
header.writeUInt32LE(36 + dataSize, 4);
header.write('WAVE', 8);
header.write('fmt ', 12);
header.writeUInt32LE(16, 16);
header.writeUInt16LE(1, 20);
header.writeUInt16LE(2, 22);
header.writeUInt32LE(SAMPLE_RATE, 24);
header.writeUInt32LE(SAMPLE_RATE * 2 * 2, 28);
header.writeUInt16LE(4, 32);
header.writeUInt16LE(16, 34);
header.write('data', 36);
header.writeUInt32LE(dataSize, 40);

const pcmData = Buffer.alloc(dataSize);
let offset = 0;
for (let i = 0; i < TOTAL_SAMPLES; i++) {
  const l = Math.floor(Math.max(-1, Math.min(1, masterLeft[i])) * 32767);
  const r = Math.floor(Math.max(-1, Math.min(1, masterRight[i])) * 32767);
  pcmData.writeInt16LE(l, offset);
  offset += 2;
  pcmData.writeInt16LE(r, offset);
  offset += 2;
}

const outPath = path.resolve(__dirname, '../public/audio/user-master-soundtrack-60s.wav');
fs.writeFileSync(outPath, Buffer.concat([header, pcmData]));
console.log(`Master soundtrack written to: ${outPath} (${(fs.statSync(outPath).size / (1024 * 1024)).toFixed(2)} MB)`);

// Cleanup temp PCM
fs.rmSync(TEMP_DIR, { recursive: true, force: true });
console.log("Cleanup completed.");
