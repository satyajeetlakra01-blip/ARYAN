# Aryan Tanty — Personal Portfolio Website (Motion Graphic Edition)

A high-energy, motion graphic editorial personal brand website built specifically for **Aryan Tanty** (Student, Digital Creator & Technology Enthusiast).

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Lucide Icons**.

---

## ✦ Major Design Transformation: Solar Kinetic & RCB Crimson

Addressing the critique to break out of standard scrolling templates, this edition transforms the website into a **creative motion graphic studio experience**:

1. **New Solar Kinetic & RCB Crimson Color Palette**:
   - Replaced generic cold cyan with **Radiant Solar Amber (`#FF6B00` / `#FFA043`)**, **RCB Crimson (`#FF2A4D` / `#C8102E`)**, and **Acid Neon Chartreuse (`#E2FD52`)**.
   - Directly harmonizes with Aryan's warm natural skin tones, Indian forest excursion daylight, and deep passion for Royal Challengers Bengaluru & Virat Kohli.

2. **Neural Background Cutout Pipeline**:
   - Processed authentic camera captures into high-precision transparent PNG cutouts in `public/images/cutouts/` using `u2netp`:
     - `aryan-hero-cutout.png`
     - `aryan-portrait-standing-cutout.png`
     - `aryan-sitting-rock-cutout.png`
     - `aryan-stream-log-cutout.png`
   - Preserves 100% of Aryan's authentic face, posture, and expression with zero AI-generated facial distortion.

3. **3D Magazine Depth Layering (The Hero Centerpiece)**:
   - **Back Layer**: Animated SVG cyber aperture radar + gigantic outlined kinetic typography (`ARYAN TANTY`).
   - **Middle Layer**: Radial solar/crimson gradient bloom aura.
   - **Foreground Layer**: Transparent cutout of Aryan standing in front of the typography, creating an authentic 3D depth magazine cover illusion.
   - **Interactive Switcher**: Live toggle between **[ 3D Cutout Studio ]** and **[ Full Excursion Lens ]**.

4. **Infinite Kinetic Marquee Ribbon (`KineticTicker`)**:
   - Dual-speed counter-scrolling kinetic text banners celebrating Aryan's identity, ICSE Class 10 status, RCB allegiance, and design principles.

5. **Interactive 3D Motion Graphic Studio (`#motion-lab`)**:
   - An interactive visual mixer allowing visitors to inspect Aryan across 4 motion graphic poster styles:
     - *Solar Kinetic Poster* (Amber solar rays & cyber aperture geometry)
     - *RCB Crimson Arena* (Royal Challengers Bengaluru red & gold stadium pulse)
     - *Acid Cyber Editorial* (High-contrast chartreuse typography & academic telemetry)
     - *River Flow Balance* (Poised stream log excursion with ambient depth lighting)
   - Real-time interactive toggles: `3D Cutout: ON/OFF`, `HUD Telemetry: VISIBLE/HIDDEN`, `Glow Intensity: STANDARD/HIGH`.

6. **Interactive Virat Kohli / RCB 18 Chase Engine (`#cricket`)**:
   - Interactive run-rate pressure slider (6.0 to 18.0 RPO) with dynamic psychological state shifts ("Calculated Strike Rotation" &rarr; "Stepping on the Accelerator" &rarr; "King Kohli Melbourne 82* Mentality").
   - Stadium floodlight ambiance with giant `#18` watermark and Virat Kohli work-ethic benchmarks.

7. **Tactile 3D Tilt Cards (`MotionCard`)**:
   - Reusable interactive cards with 3D perspective tilt (`rotateX`, `rotateY`) and dynamic specular radial shine following the user's cursor.

8. **Audio Frequency Equalizer**:
   - Animated lossless audio wave bars in the Technology section demonstrating acoustic appreciation.

---

## ✦ Implemented Sections

- **Header / Sticky Navigation**: Frosted glass, dynamic section spy, Cmd+K trigger, theme toggle, and mobile drawer.
- **Hero (`#hero`)**: 3D Magazine cutout depth centerpiece, kinetic typography, and CTA pills.
- **Kinetic Ticker**: Dual infinite motion graphic marquee ribbons.
- **01 / About Aryan (`#about`)**: Cutout layering, authentic student journey, and 3D tilt core pillars.
- **02 / Personal Philosophy (`#philosophy`)**: *"Make it useful. Make it beautiful. Make it feel right."* with criteria checklist.
- **03 / Technology Focus (`#technology`)**: Filterable tech categories, hardware craft, and animated audio waveform.
- **Featured / Motion Graphic Studio (`#motion-lab`)**: Interactive 4-style poster lab with cutout toggles and telemetry HUDs.
- **04 / Creative Lab & Gallery (`#creative`)**: Filterable gallery of all 10 authentic excursion photos with full-resolution Lightbox Modal (zoom, keyboard arrows, ESC).
- **05 / Academics (`#academics`)**: ICSE Class 10 focus (Math, Biology, English Lit, Economics) with uniform cutout portrait and blueprint grid.
- **06 / Cricket Passion (`#cricket`)**: RCB & Virat Kohli Chase Engine simulator.
- **07 / Digital Lifestyle (`#lifestyle`)**: Stream log cutout portrait and workspace hygiene principles.
- **08 / Mindset & Strengths (`#personality`)**: 6 authentic trait cards and capability matrix.
- **09 / Connect (`#contact`)**: Direct message draft form with copyable email placeholder.
- **Footer**: Live Indian Standard Time (IST) clock with live seconds, back-to-top button, and quick jump links.

---

## ✦ Getting Started

### Prerequisites
- Node.js 18+ or 20+

### Production Run
```bash
npm run build
npm run start -- -p 3005
```
Open [http://localhost:3005](http://localhost:3005) in your browser.
