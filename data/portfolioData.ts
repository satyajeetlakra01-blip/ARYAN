export interface PortfolioPhoto {
  id: string;
  src: string;
  fullSrc: string;
  originalFileName: string;
  alt: string;
  title: string;
  category: "portrait" | "nature" | "moments";
  description: string;
  aspectRatio: string;
  featured?: boolean;
}

export interface TechItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  tags: string[];
}

export interface AcademicSubject {
  title: string;
  code?: string;
  focus: string;
  description: string;
  iconName: string;
  highlights: string[];
}

export interface PersonalityTrait {
  keyword: string;
  phrase: string;
  explanation: string;
}

export const ARYAN_PROFILE = {
  name: "Aryan Tanty",
  tagline: "Young. Smart. Digital. Creative. Precise. Ambitious.",
  heroHeadline: "Curious by nature. Precise by choice.",
  heroSubheadline: "Student • Digital Creator • Technology Enthusiast",
  heroBio:
    "Exploring the intersections of modern technology, creative digital tooling, structured academics, and everyday precision. Built with intent, refined through curiosity.",
  academicStatus: "ICSE Class 10 Student",
  location: "India",
  year: "2026",
  availability: "Always Exploring & Learning",
  email: "vroaryan25@gmail.com",
  instagram: "https://www.instagram.com/_aryan085/?__pwa=1",
  instagramHandle: "@_aryan085",
};

export const PORTFOLIO_PHOTOS: PortfolioPhoto[] = [
  {
    id: "hero-portrait",
    src: "/images/optimized/aryan-hero.jpg",
    fullSrc: "/images/aryan-hero.jpg",
    originalFileName: "IMG_20260124_123422031_HDR_PORTRAIT.jpg",
    alt: "Aryan Tanty standing poised with one foot on a fallen tree over a forest stream, smiling warmly with direct eye contact",
    title: "Vibrant Presence & Direct Gaze",
    category: "portrait",
    description: "Natural forest daylight by the river stream. Energetic, confident, and authentic.",
    aspectRatio: "3:4",
    featured: true,
  },
  {
    id: "standing-portrait",
    src: "/images/optimized/aryan-portrait-standing.jpg",
    fullSrc: "/images/aryan-portrait-standing.jpg",
    originalFileName: "IMG_20260124_120557343_HDR_PORTRAIT.jpg",
    alt: "Aryan Tanty standing full body beside woodland trees, smiling gently in ICSE student uniform",
    title: "Poise & Academic Identity",
    category: "portrait",
    description: "Clear forest pathway, crisp uniform with lanyard and white sneakers, calm demeanor.",
    aspectRatio: "3:4",
    featured: true,
  },
  {
    id: "focused-rock",
    src: "/images/optimized/aryan-sitting-rock-focused.jpg",
    fullSrc: "/images/aryan-sitting-rock-focused.jpg",
    originalFileName: "IMG_20260124_120944880_HDR_PORTRAIT.jpg",
    alt: "Aryan Tanty seated on a boulder in a forest trail, looking directly at the camera with a focused expression",
    title: "Thoughtful Focus",
    category: "portrait",
    description: "Selective depth of field, rocky forest terrain, quiet concentration.",
    aspectRatio: "3:4",
    featured: true,
  },
  {
    id: "stream-log-poised",
    src: "/images/optimized/aryan-stream-log-poised.jpg",
    fullSrc: "/images/aryan-stream-log-poised.jpg",
    originalFileName: "IMG_20260124_122212764_HDR_PORTRAIT.jpg",
    alt: "Aryan Tanty standing on a natural fallen log over a mountain stream, hand resting on a tree trunk",
    title: "Balance & Nature Harmony",
    category: "nature",
    description: "Suspended above a crystal-clear forest brook, ferns and lush foliage in background.",
    aspectRatio: "3:4",
    featured: true,
  },
  {
    id: "stream-log-sitting",
    src: "/images/optimized/aryan-stream-log-sitting.jpg",
    fullSrc: "/images/aryan-stream-log-sitting.jpg",
    originalFileName: "IMG_20260124_123433103_HDR_PORTRAIT.jpg",
    alt: "Aryan Tanty seated comfortably on an arched tree trunk spanning a forest river",
    title: "The River Arch",
    category: "nature",
    description: "Sunlight dancing across moving water and canopy foliage, natural outdoor relaxation.",
    aspectRatio: "3:4",
  },
  {
    id: "waterfall-gorge-wide",
    src: "/images/optimized/aryan-waterfall-gorge-wide.jpg",
    fullSrc: "/images/aryan-waterfall-gorge-wide.jpg",
    originalFileName: "IMG_20260124_121519091_HDR_AE.jpg",
    alt: "Aryan Tanty seen from behind gazing across a gorge pond toward a cascading waterfall nestled in rock cliffs",
    title: "The Waterfall Basin",
    category: "nature",
    description: "Vast canyon view with sunlight cutting through trees and water cascading down granite cliffs.",
    aspectRatio: "3:4",
    featured: true,
  },
  {
    id: "waterfall-portrait",
    src: "/images/optimized/aryan-waterfall-portrait.jpg",
    fullSrc: "/images/aryan-waterfall-portrait.jpg",
    originalFileName: "IMG_20260124_121643520_HDR_PORTRAIT.jpg",
    alt: "Cinematic portrait view of Aryan overlooking the waterfall basin with soft bokeh backdrop",
    title: "Gorge Contemplation",
    category: "portrait",
    description: "Soft focus on the rushing waterfall and dark pond pool.",
    aspectRatio: "3:4",
  },
  {
    id: "sitting-rock-relaxed",
    src: "/images/optimized/aryan-sitting-rock-relaxed.jpg",
    fullSrc: "/images/aryan-sitting-rock-relaxed.jpg",
    originalFileName: "IMG_20260124_120659471_HDR_PORTRAIT.jpg",
    alt: "Aryan Tanty resting casually on a stone along the trail in natural sunlight",
    title: "Trailside Pause",
    category: "portrait",
    description: "Unfiltered student excursion moment among leaves and natural stones.",
    aspectRatio: "3:4",
  },
  {
    id: "candid-laugh",
    src: "/images/optimized/aryan-candid-laugh.jpg",
    fullSrc: "/images/aryan-candid-laugh.jpg",
    originalFileName: "IMG_20260124_123417764_HDR_PORTRAIT.jpg",
    alt: "Aryan Tanty caught laughing and gesturing naturally by the river trail",
    title: "Spontaneous Energy",
    category: "moments",
    description: "Genuine laughter, youth energy, unscripted camaraderie.",
    aspectRatio: "3:4",
  },
  {
    id: "waterfall-overlook",
    src: "/images/optimized/aryan-waterfall-overlook.jpg",
    fullSrc: "/images/aryan-waterfall-overlook.jpg",
    originalFileName: "IMG_20260124_121607995_HDR_AE.jpg",
    alt: "Aryan with hands on hips taking in the vertical grandeur of the ravine and waterfall",
    title: "Horizons & Heights",
    category: "nature",
    description: "Towering rock faces framing the mountain water retreat.",
    aspectRatio: "3:4",
  },
];

export const PHILOSOPHY_TENETS = [
  {
    number: "01",
    title: "Make it useful",
    subtitle: "Utility precedes ornament",
    description:
      "Technology and tools should earn their keep. If something doesn't save time, solve an actual problem, or clarify thinking, it's just clutter.",
  },
  {
    number: "02",
    title: "Make it beautiful",
    subtitle: "Elegance through restraint",
    description:
      "Great aesthetics are not about adding decorations; they come from intentional proportion, typography that breathes, and harmonious structure.",
  },
  {
    number: "03",
    title: "Make it feel right",
    subtitle: "Tactile, responsive, natural",
    description:
      "From physical hardware in hand to digital interactions on screen, the experience must feel intuitive, responsive, and effortlessly polished.",
  },
];

export const TECH_INTERESTS: TechItem[] = [
  {
    id: "ai-systems",
    title: "AI & Digital Intelligence",
    subtitle: "From curiosity to daily leverage",
    description:
      "Fascinated by generative models, autonomous agent frameworks, and how intelligent tools can accelerate learning, creative ideation, and problem-solving.",
    iconName: "Cpu",
    tags: ["LLMs", "Generative Vision", "Prompt Crafting", "Automation"],
  },
  {
    id: "wearable-tech",
    title: "Wearables & Smart Ecosystems",
    subtitle: "Ambient and invisible computing",
    description:
      "Intrigued by smart eyewear, advanced smartwatches, and biometric tracking hardware that blend seamlessly into daily life without overwhelming the senses.",
    iconName: "Glasses",
    tags: ["Smart Eyewear", "Health Metrics", "Smartwatches", "Ambient UX"],
  },
  {
    id: "hardware-craft",
    title: "Modern Hardware & Devices",
    subtitle: "Precision engineering & tactile feel",
    description:
      "Appreciates well-engineered machinery—from crisp mechanical responsiveness to clean laptop thermals, minimal desk architecture, and refined industrial design.",
    iconName: "Laptop",
    tags: ["Silicon Architecture", "Displays", "Industrial Design", "Peripherals"],
  },
  {
    id: "premium-audio",
    title: "High-Fidelity Audio",
    subtitle: "Acoustic depth & immersion",
    description:
      "Passion for spatial audio, dynamic drivers, active noise cancellation, and clean acoustic profiles that make music and podcasts an immersive sanctuary.",
    iconName: "Headphones",
    tags: ["Lossless Audio", "Active NC", "Spatial Sound", "Tuning"],
  },
  {
    id: "creative-tools",
    title: "Visual Tools & Media Craft",
    subtitle: "Digital editing & visual refinement",
    description:
      "Experimenting with photo editing suites, visual restoration, color grading nuances, and multi-layered creative workflows.",
    iconName: "Sparkles",
    tags: ["Color Grading", "Visual Composition", "Retouching", "Typography"],
  },
  {
    id: "productivity-systems",
    title: "Structured Productivity & Cloud",
    subtitle: "Frictionless digital workflows",
    description:
      "Believes in maintaining clean digital hygiene: disciplined file organization, instant synchronization, keyboard shortcuts, and minimal distractions.",
    iconName: "Workflow",
    tags: ["Cloud Sync", "System Hygiene", "Shortcuts", "Focus Mode"],
  },
];

export const ACADEMIC_SUBJECTS: AcademicSubject[] = [
  {
    title: "Mathematics",
    code: "ICSE 10",
    focus: "Analytical Logic & Spatial Problem Solving",
    description:
      "Enjoying algebraic manipulation, geometry theorems, coordinate proofs, and structured step-by-step logic that leaves zero room for ambiguity.",
    iconName: "Binary",
    highlights: ["Algebraic proofs", "Geometry & Trigonometry", "Step-by-step rigor"],
  },
  {
    title: "Biology",
    code: "ICSE 10",
    focus: "Living Systems & Biological Mechanics",
    description:
      "Fascinated by physiological systems, cellular genetics, plant mechanics, and the intricate natural engineering of living organisms.",
    iconName: "Dna",
    highlights: ["Genetics & Cells", "Human Physiology", "Ecological systems"],
  },
  {
    title: "English Literature",
    code: "ICSE 10",
    focus: "Critical Reading, Drama & Narrative Depth",
    description:
      "Appreciating classic plays, poetic meter, character motives, and the enduring power of concise, evocative human language.",
    iconName: "BookOpen",
    highlights: ["Dramatic texts", "Poetic analysis", "Narrative clarity"],
  },
  {
    title: "Economics",
    code: "ICSE 10",
    focus: "Resource Dynamics, Markets & Value Systems",
    description:
      "Understanding market equilibrium, banking systems, resource allocation, and the behavioral incentives shaping the modern world.",
    iconName: "TrendingUp",
    highlights: ["Market systems", "Incentive design", "Microeconomics"],
  },
];

export const CRICKET_INSIGHTS = {
  headline: "Off-screen, there's cricket.",
  subtitle: "Intensity, resilience, and the relentless pursuit of excellence.",
  team: "Royal Challengers Bengaluru (RCB)",
  roleModel: "Virat Kohli",
  coreQuote:
    "Cricket teaches discipline that textbooks can't replicate: staying composed under intense pressure, backing your team unconditionally, and respecting every single ball.",
  points: [
    {
      title: "Royal Challengers Bengaluru Loyalty",
      detail:
        "Passionate supporter of RCB through every high and test of endurance. A loyalty built on heart, fierce passion, and unwavering belief.",
    },
    {
      title: "The Virat Kohli Standard",
      detail:
        "Inspired by Kohli's unmatched work ethic, physical fitness discipline, fierce self-belief, and ability to master high-pressure run-chases.",
    },
    {
      title: "Mental Composure & Focus",
      detail:
        "Appreciates the cerebral duel between bowler and batsman—where split-second reflexes and mental toughness define the outcome.",
    },
  ],
};

export const DIGITAL_LIFESTYLE_ITEMS = [
  {
    title: "Minimal Distraction Rig",
    description:
      "A clean workspace free from cable chaos and visual noise. Clean surfaces promote clean thinking.",
    category: "Space",
  },
  {
    title: "Acoustic Isolation",
    description:
      "Premium noise cancellation to enter deep work and focus modes during rigorous ICSE prep or creative projects.",
    category: "Audio",
  },
  {
    title: "Synchronized Cloud Flow",
    description:
      "Seamless transfer of study notes, visual edits, and reading materials across mobile and computer environments.",
    category: "Sync",
  },
  {
    title: "Zero Digital Clutter",
    description:
      "Inbox zero mindset, organized file directories, no bloated desktop shortcuts, and curated applications only.",
    category: "Hygiene",
  },
];

export const SKILLS_MATRIX = [
  { name: "Creative Thinking", category: "Core Mindset" },
  { name: "Attention to Detail", category: "Core Mindset" },
  { name: "Digital Fluency", category: "Technical" },
  { name: "Visual Composition", category: "Creative" },
  { name: "Problem Solving", category: "Analytical" },
  { name: "Curiosity & Exploration", category: "Core Mindset" },
  { name: "Rapid Experimentation", category: "Technical" },
  { name: "Persistence & Grit", category: "Character" },
  { name: "Clean Aesthetics", category: "Creative" },
  { name: "Logical Deduction", category: "Analytical" },
  { name: "Conceptual Synthesis", category: "Academic" },
  { name: "Quality Obsession", category: "Character" },
];

export const PERSONALITY_TRAITS: PersonalityTrait[] = [
  {
    keyword: "CURIOUS",
    phrase: "Always exploring something new.",
    explanation:
      "Whether it is an emerging AI architecture, a new hardware release, or a complex math problem, inquiry comes naturally.",
  },
  {
    keyword: "PRECISE",
    phrase: "Small details make the difference.",
    explanation:
      "A pixel out of place, an awkward transition, or an unrefined note stands out. Good enough is never the goal.",
  },
  {
    keyword: "CREATIVE",
    phrase: "Ideas should become experiences.",
    explanation:
      "Thinking doesn't stay abstract—it manifests in curated photos, digital projects, clean layouts, and thoughtful experiments.",
  },
  {
    keyword: "PRACTICAL",
    phrase: "Useful beats unnecessary.",
    explanation:
      "No patience for bloated complexity or superficial flair. If a tool doesn't save time or heighten clarity, it gets cut.",
  },
  {
    keyword: "PERSISTENT",
    phrase: "Refinement is part of the process.",
    explanation:
      "Pushing through challenging academic problems, debugging digital quirks, or fine-tuning an edit until it hits the mark.",
  },
  {
    keyword: "DIRECT",
    phrase: "Clear thinking. Clear communication.",
    explanation:
      "Straightforward, honest, and unambiguous in thoughts and interactions. Respectful of time and authenticity.",
  },
];

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Technology", href: "#technology" },
  { label: "Creative Lab", href: "#creative" },
  { label: "Academics", href: "#academics" },
  { label: "Cricket", href: "#cricket" },
  { label: "Lifestyle", href: "#lifestyle" },
  { label: "Connect", href: "#contact" },
];
