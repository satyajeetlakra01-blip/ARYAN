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
    id: "bike-portrait",
    src: "/images/optimized/aryan-bike-portrait.webp",
    fullSrc: "/images/aryan-bike-portrait.webp",
    originalFileName: "aryan-bike-portrait.jpg",
    alt: "Aryan Tanty on his Royal Enfield motorcycle in striped shirt with tilak, smiling authentically",
    title: "Royal Enfield // Authentic Presence",
    category: "portrait",
    description: "Shot on Galaxy S24 Ultra. Authentic student and digital creator presence in outdoor sunlight.",
    aspectRatio: "9:16",
    featured: true,
  },
  {
    id: "bike-helmet",
    src: "/images/optimized/aryan-bike-helmet.webp",
    fullSrc: "/images/aryan-bike-helmet.webp",
    originalFileName: "aryan-bike-helmet.jpg",
    alt: "Aryan Tanty with full-face helmet and open visor on his Royal Enfield OD 16K 9156",
    title: "Rider Focus // OD 16K 9156",
    category: "portrait",
    description: "Aerodynamic helmet focus, Royal Enfield engineering, and fearless determination.",
    aspectRatio: "3:4",
    featured: true,
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
