import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Identity } from "./scenes/Scene2Identity";
import { Scene3Tech } from "./scenes/Scene3Tech";
import { Scene4Cricket } from "./scenes/Scene4Cricket";
import { Scene5ClimaxEndCard } from "./scenes/Scene5ClimaxEndCard";

export const MainVideoAd: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#050608" }}>
      {/* 60s Master Audio Soundtrack with Frame-Accurate Sound Effects */}
      <Audio src={staticFile("audio/ad-soundtrack.wav")} volume={1.0} />

      {/* ACT 1: THE HOOK (0s - 6s / 180 frames) */}
      <Sequence from={0} durationInFrames={180} name="Act 1 - The Hook">
        <Scene1Hook />
      </Sequence>

      {/* ACT 2: CORE IDENTITY & RIGOR (6s - 18s / 360 frames) */}
      <Sequence from={180} durationInFrames={360} name="Act 2 - Core Identity">
        <Scene2Identity />
      </Sequence>

      {/* ACT 3: TECHNOLOGY & SPATIAL AUDIO (18s - 32s / 420 frames) */}
      <Sequence from={540} durationInFrames={420} name="Act 3 - Tech & Audio">
        <Scene3Tech />
      </Sequence>

      {/* ACT 4: CRICKET & VK 18 SPIRIT (32s - 46s / 420 frames) */}
      <Sequence from={960} durationInFrames={420} name="Act 4 - Cricket & #18">
        <Scene4Cricket />
      </Sequence>

      {/* ACT 5: THE CLIMAX & GRAND END-CARD (46s - 60s / 420 frames) */}
      <Sequence from={1380} durationInFrames={420} name="Act 5 - Climax & End Card">
        <Scene5ClimaxEndCard />
      </Sequence>
    </AbsoluteFill>
  );
};
