import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07080c" },
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://aryantanty.com"),
  title: "Aryan Tanty — Student, Digital Creator & Technology Enthusiast",
  description:
    "Explore Aryan Tanty's world of technology, creativity, digital experimentation, academics, and personal interests. Young, curious, and precise.",
  keywords: [
    "Aryan Tanty",
    "Digital Creator",
    "Technology Enthusiast",
    "ICSE Class 10",
    "AI Systems",
    "Personal Portfolio",
    "Visual Creator",
    "Cricket",
  ],
  authors: [{ name: "Aryan Tanty" }],
  creator: "Aryan Tanty",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aryantanty.com",
    siteName: "Aryan Tanty — Personal Portfolio",
    title: "Aryan Tanty — Student, Digital Creator & Technology Enthusiast",
    description:
      "A personal space for technology, creativity, structured academics, and digital experimentation. Curious by nature. Precise by choice.",
    images: [
      {
        url: "/images/aryan-hero.jpg",
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
      "A personal space for technology, creativity, structured academics, and digital experimentation.",
    images: ["/images/aryan-hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/aryan-hero.jpg" />
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
