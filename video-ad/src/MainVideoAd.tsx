import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Identity } from "./scenes/Scene2Identity";
import { Scene3Tech } from "./scenes/Scene3Tech";
import { Scene4Cricket } from "./scenes/Scene4Cricket";
import { Scene5ClimaxEndCard } from "./scenes/Scene5ClimaxEndCard";

export const MainVideoAd: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#030407" }}>
      {/* 60s Curated User Master Soundtrack with Frame-Accurate Sound Effects & Music */}
      <Audio
        src={staticFile("audio/user-master-soundtrack-60s.wav")}
        volume={1.0}
      />

      {/* ACT 1: THE HOOK (0s - 6s / 180 frames) */}
      <Sequence from={0} durationInFrames={180} name="Act 1 - The Hook">
        <Scene1Hook />
      </Sequence>

      {/* ACT 2: CORE IDENTITY & RIGOR (6s - 16s / 300 frames) */}
      <Sequence from={180} durationInFrames={300} name="Act 2 - Core Identity">
        <Scene2Identity />
      </Sequence>

      {/* ACT 3: PIERCING CIRCUIT, TECH & SPATIAL AUDIO (16s - 31s / 450 frames) */}
      <Sequence from={480} durationInFrames={450} name="Act 3 - Circuit & Tech">
        <Scene3Tech />
      </Sequence>

      {/* ACT 4: CRICKET & VIRAT KOHLI #18 SPIRIT (31s - 45s / 420 frames) */}
      <Sequence from={930} durationInFrames={420} name="Act 4 - Cricket & #18">
        <Scene4Cricket />
      </Sequence>

      {/* ACT 5: THE CLIMAX DROP & GRAND END-CARD (45s - 60s / 450 frames) */}
      <Sequence from={1350} durationInFrames={450} name="Act 5 - Climax & End Card">
        <Scene5ClimaxEndCard />
      </Sequence>
    </AbsoluteFill>
  );
};
