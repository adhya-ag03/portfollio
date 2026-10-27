import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/data";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(site.ogUrl),
  title: `${site.name} | ${site.title}`,
  description: `${site.roleLine}. ${site.heroIntro}`,
  keywords: [
    "Adhya Agarwal",
    "AI Agents",
    "LLM Evaluation",
    "LLM Benchmarking",
    "Full-Stack Developer",
    "React",
    "Next.js",
    "FastAPI",
    "Portfolio",
  ],
  authors: [{ name: site.name, url: site.github }],
  openGraph: {
    title: `${site.name} | ${site.title}`,
    description: site.heroIntro,
    url: site.ogUrl,
    siteName: site.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.title}`,
    description: site.heroIntro,
  },
};

export const viewport = {
  themeColor: "#050308",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrains.variable} noise antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
