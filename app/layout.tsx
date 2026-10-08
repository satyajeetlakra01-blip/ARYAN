import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#06070a" },
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://aryantanty18-nu.vercel.app"),
  title: {
    default: "Aryan Tanty — Student, Digital Creator & Technology Enthusiast",
    template: "%s | Aryan Tanty",
  },
  description:
    "Official portfolio of Aryan Tanty. Young, energetic, and detail-oriented student and digital creator passionate about practical AI, hardware technology, spatial audio, ICSE Class 10 academics, and cricket.",
  applicationName: "Aryan Tanty Portfolio",
  authors: [{ name: "Aryan Tanty", url: "https://aryantanty18-nu.vercel.app" }],
  generator: "Next.js 14",
  keywords: [
    "Aryan Tanty",
    "Aryan Tanty portfolio",
    "Aryan Tanty student",
    "Aryan Tanty digital creator",
    "Aryan Tanty technology enthusiast",
    "Aryan Tanty ICSE Class 10",
    "Aryan Tanty Instagram @_aryan085",
    "Aryan Tanty RCB",
    "Aryan Tanty Virat Kohli",
    "Aryan Tanty email vroaryan25@gmail.com",
    "Aryan Tanty website",
    "Aryan Tanty official",
    "Digital Creator India",
    "Motion Graphics Visuals",
    "AI Tools and Experimentation",
  ],
  creator: "Aryan Tanty",
  publisher: "Aryan Tanty",
  alternates: {
    canonical: "https://aryantanty18-nu.vercel.app",
  },
  verification: {
    google: "google3e03f8662a84158e",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aryantanty.vercel.app",
    siteName: "Aryan Tanty — Official Portfolio",
    title: "Aryan Tanty — Student, Digital Creator & Technology Enthusiast",
    description:
      "Curious by nature. Precise by choice. Explore Aryan Tanty's world of technology, creative experimentation, academics, and cricket.",
    images: [
      {
        url: "/images/aryan-bike-portrait.webp",
        width: 1200,
        height: 1600,
        alt: "Aryan Tanty — Student, Digital Creator & Technology Enthusiast",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aryan Tanty — Student, Digital Creator & Technology Enthusiast",
    description:
      "Curious by nature. Precise by choice. Official digital portfolio of Aryan Tanty.",
    images: ["/images/aryan-bike-portrait.webp"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": "https://aryantanty.vercel.app/#webpage",
        "url": "https://aryantanty.vercel.app",
        "name": "Aryan Tanty — Student, Digital Creator & Technology Enthusiast",
        "description":
          "Official personal portfolio of Aryan Tanty. Student, digital creator, and technology enthusiast.",
        "inLanguage": "en-US",
        "mainEntity": {
          "@type": "Person",
          "@id": "https://aryantanty.vercel.app/#person",
          "name": "Aryan Tanty",
          "alternateName": ["Aryan", "_aryan085"],
          "url": "https://aryantanty.vercel.app",
          "image": "https://aryantanty.vercel.app/images/aryan-bike-portrait.webp",
          "email": "mailto:vroaryan25@gmail.com",
          "jobTitle": "Student & Digital Creator",
          "nationality": "Indian",
          "sameAs": [
            "https://www.instagram.com/_aryan085/?__pwa=1",
            "https://github.com/satyajeetlakra01-blip/ARYAN"
          ],
          "knowsAbout": [
            "Artificial Intelligence",
            "Hardware Engineering",
            "Spatial Audio",
            "Visual Editing",
            "Motion Graphics",
            "Cricket",
            "Virat Kohli",
            "Royal Challengers Bengaluru",
            "ICSE Class 10 Academics"
          ],
          "description":
            "Aryan Tanty is a young, energetic, creative, and detail-oriented student and digital creator in India passionate about practical AI, hardware technology, and cricket."
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://aryantanty.vercel.app/#website",
        "url": "https://aryantanty.vercel.app",
        "name": "Aryan Tanty",
        "description": "Official personal brand and creator portfolio of Aryan Tanty.",
        "publisher": {
          "@id": "https://aryantanty.vercel.app/#person"
        }
      }
    ]
  };

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/aryan-bike-portrait.webp" />
        <link rel="canonical" href="https://aryantanty.vercel.app" />
        <meta name="google-site-verification" content="google3e03f8662a84158e" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const storedTheme = localStorage.getItem('aryan_portfolio_theme');
                if (storedTheme === 'light') {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                } else {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="antialiased selection:bg-solar-500/25 selection:text-white">
        {children}
      </body>
    </html>
  );
}
